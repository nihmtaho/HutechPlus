import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';
import {
  Provider as PaperProvider,
  ActivityIndicator,
  Colors,
  Button,
  TextInput,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import Config from './config.json'

console.disableYellowBox = true;

const ReconizeCamera = () => {

  const cameraRef = useRef()
  const [hasPermission, setHasPermission] = useState(null)
  const [faceID, setFaceID] = useState(null)
  const [isShot, setIsShot] = useState(false)
  const [isReconize, setIsReconize] = useState(false)
  const [faceUri, setFaceUri] = useState(null)
  const [personGroupId, setPersonGroupId] = useState('16dthje1') // clean
  const [name, setName] = useState('')
  const [mssv, setMSSV] = useState('')
  // const [personId, setPersonId] = useState('')

  const cognitiveHeaders = new Headers()
  cognitiveHeaders.append('Content-Type', 'application/json')
  cognitiveHeaders.append('Ocp-Apim-Subscription-Key', Config.COGNITIVE_SERVICES_KEY)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []); // laau lam :)) 

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.01, base64: true });
    setFaceUri(photo.uri)
    setIsShot(true)
    const uploadResult = await uploadImage(photo.base64) // return image link
    if (!uploadResult) {
      Alert.alert(
        "Upload fail",
        "Please take photo again.",
        [
          {
            text: "OK",
            onPress: () => { setIsShot(false) }
          }
        ]
      );
      return;
    }
    console.log("uploadImage -> success")

    const detectResult = await detectFace(uploadResult) // return face ID
    if (!detectResult) {
      Alert.alert(
        "Detect fail",
        "Please take photo with only 1 face.",
        [
          {
            text: "OK",
            onPress: () => { setIsShot(false) }
          }
        ]
      );
      return;
    }
    console.log("detect -> success")

    const identityResult = await identify(detectResult) // return person ID
    if (!identityResult) {
      console.log("Identity fail");
      Alert.alert(
        "Cannot find infomation",
        "Create new profile",
        [
          {
            text: "Cancel"
          },
          {
            text: "OK",
            onPress: () => {
              setIsReconize(true)
              setIsShot(false)
            }
          },
        ]
      );
      return;
    }
    console.log("identity -> success")

    const nameResult = await getPerson(identityResult)
    if (nameResult) {
      Alert.alert(
        "Detect success",
        "Hello " + nameResult,
        [
          {
            text: "OK",
            onPress: () => {
              setIsShot(false)
            }
          },
        ]
      )
      handleAddFace(identityResult, uploadResult);
    } else {
      Alert.alert(
        'Get user data fail',
        'Something wrong',
        [
          {
            text: "OK",
            onPress: () => {
              setIsShot(false)
            }
          },
        ]
      );
    }
  }

  // upload to imgur and get image link
  const uploadImage = async (base64) => {
    let uploadResult = false;
    const uploadHeaders = new Headers()
    // uploadHeaders.append('Content-Type', 'application/json') 
    uploadHeaders.append('Authorization', `Client-ID ${Config.IMGUR_CLIENT_ID}`)
    const formData = new FormData();
    formData.append('image', base64)
    formData.append('type', 'base64')
    const uploadConfig = {
      method: 'POST',
      headers: uploadHeaders,
      body: formData
    }

    const uploadRequest = new Request(Config.IMGUR_URL, uploadConfig);
    await fetch(uploadRequest)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res;
        }
      })
      .then(resJson => {
        try {
          uploadResult = resJson.data.link;
          console.log("uploadImage -> image link: ", resJson.data.link)
        } catch (e) { }
      })
    return uploadResult;
  }

  const createGroup = async () => {
    const createConfig = {
      method: 'PUT',
      headers: cognitiveHeaders,
      body: JSON.stringify({
        "name": `${personGroupId}`,
        "userData": `face list reconize for ${personGroupId} class.`,
        "recognitionModel": "recognition_02"
      })
    }

    const createRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}`, createConfig)
    const createResponse = await fetch(createRequest)
    const createJson = await createResponse.json()
    console.log("createClass -> createJson", createJson)
  }

  const handleCreatePerson = async () => {
    const personId = await createPerson();
    if (!personId) {
      return;
    }
    await handleAddFace(personId);
    await getPerson(personId);
    setIsReconize(false)
    setName(null)
    setMSSV(null)
  }

  const createPerson = async () => {
    let createPersonStatus = null;
    console.log("createPerson -> state.name"), name;
    console.log("createPerson -> state.mssv", mssv);
    if (!name || !mssv) {
      console.log("createPerson -> missing name or mssv");
      return;
    }

    const addConfig = {
      method: 'POST',
      headers: cognitiveHeaders,
      body: JSON.stringify({
        "name": name,
        "userData": mssv
      })
    }

    const addRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}/persons`, addConfig)
    await fetch(addRequest)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("createPerson -> res", res.json())
          console.log("createPerson -> Add person fail")
        }
      })
      .then(resJson => {
        console.log("createPerson -> resJson", resJson)
        try {
          createPersonStatus = resJson.personId
        } catch (e) { }
        // setPersonId(createPersonStatus);
        if (createPersonStatus) {
          Alert.alert('Create person success', name);
        }
      })
    return createPersonStatus;
  }

  const handleAddFace = async (personId, faceURL) => {
    await addFace(personId, faceURL)
    await training()
    await gTrainingStatus()
  }

  const addFace = async (personId, faceURL) => {
    // let addStatus = false;
    // console.log("global -> personId", personId)
    const addConfig = {
      method: 'POST',
      headers: cognitiveHeaders,
      body: JSON.stringify({
        "url": faceURL
      })
    }

    const addRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces?detectionModel=detection_02`, addConfig)
    await fetch(addRequest)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("addFace -> res", res.json())
          console.log("addFace -> request add face fail")
        }
      })
      .then(resJson => {
        console.log("addFace -> resJson", resJson)
        try {
          Alert.alert('Add face success', addJson.persistedFaceId)
        } catch (e) { }
      })
  }

  const training = async () => {
    const trainingConfig = {
      method: 'POST',
      headers: cognitiveHeaders,
    }

    const trainingRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}/train`, trainingConfig)
    await fetch(trainingRequest)
    // const trainingJson = await trainingResponse.json()
    // console.log("train -> trainJson", trainingJson)
  }

  const gTrainingStatus = async () => {
    const GTrainHeaders = new Headers()
    GTrainHeaders.append('Content-Type', 'application/json')
    GTrainHeaders.append('Ocp-Apim-Subscription-Key', Config.COGNITIVE_SERVICES_KEY)

    const GTSConfig = {
      method: 'GET',
      headers: GTrainHeaders,
    }

    const TSRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}/training`, GTSConfig)
    await fetch(TSRequest)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("gTrainingStatus -> res", res.json())
          console.log("trainingStatus -> request get trainingStatus fail")
        }
      })
      .then(resJson => {
        console.log("trainingStatus -> resJson", resJson)
      })
  }

  const detectFace = async (imageURL) => {
    let detectFaceID = null;
    if (!imageURL) {
      console.log("detectFace -> imageURL", imageURL)
      console.log("detectFace -> face url not available, cannot not detectFace")
    } else {
      const detectConfig = {
        method: 'POST',
        headers: cognitiveHeaders,
        body: JSON.stringify({
          "url": imageURL
        })
      }

      const detectRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&recognitionModel=recognition_02&detectionModel=detection_02`, detectConfig)
      await fetch(detectRequest)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("detectFace -> res", res.json())
            console.log("detectFace -> Request detect fail")
          }
        })
        .then(resJson => {
          console.log("detectFace -> resJson", resJson)
          try {
            detectFaceID = resJson[0].faceId

            if (resJson.length > 1) {
              detectFaceID = null;
            }
          } catch (error) { }
        })
    }
    setFaceID(detectFaceID)
    return detectFaceID;
  }

  const identify = async (faceId) => {
    let identityPersonID = null;
    console.log("identify -> faceId", faceId)
    if (!faceId) {
      console.log("identify -> faceID not available, cannot not identify")
    } else {

      const identifyConfig = {
        method: 'POST',
        headers: cognitiveHeaders,
        body: JSON.stringify({
          "personGroupId": personGroupId,
          "faceIds": [
            faceId,
          ],
          "maxNumOfCandidatesReturned": 1,
          "confidenceThreshold": 0.8
        })
      }

      const identifyRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/identify`, identifyConfig)
      await fetch(identifyRequest)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            console.log("identify -> res", res.json())
            console.log("identify -> request identity fail");
          }
        })
        .then(resJson => {
          console.log("identify -> resJson", resJson)
          try {
            identityPersonID = resJson[0].candidates[0].personId
          } catch (error) { }
        })
    }
    // setPersonId(identityPersonID)
    return identityPersonID;
  }

  const getPerson = async (personId) => {
    let personName = null;
    let personMSSV = null;
    if (!personId) {
      console.log("getPerson -> personId", personId)
      console.log("getPerson -> cannot not getPerson")
    } else {
      const getPersonConfig = {
        method: 'GET',
        headers: cognitiveHeaders,
      }

      const getPersonRequest = new Request(`https://${Config.RESOURCE_NAME}.cognitiveservices.azure.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}`, getPersonConfig)
      await fetch(getPersonRequest)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            console.log("getPerson -> res", res.json())
            console.log("request get person fail");
            return;
          }
        })
        .then(resJson => {
          console.log("getPerson -> resJson", resJson)
          try {
            personName = resJson.name
            personMSSV = resJson.userData
          } catch (error) { }
        })
    }
    setName(personName)
    setMSSV(personMSSV)
    return personName;
  }



  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>

        <StatusBar hidden={true} />

        <View style={styles.topContainer}>
          <Text style={{ fontWeight: 'bold' }}>Navigation linh tinh khác</Text>
        </View>

        {
          !isReconize ?
            <View style={{ flex: 9 / 10 }}>

              {/* <Camera
                ref={cameraRef}
                type={Camera.Constants.Type.front}
                ratio='4:3'
                style={styles.cmrContainer}>
              </Camera> */}

              {
                isShot ?
                  <View
                    style={styles.cmrContainer}>
                    <Image style={styles.blurredImage} source={{ faceUri }} />
                    <BlurView intensity={250} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
                    </BlurView>
                  </View>
                  :
                  <Camera
                    ref={cameraRef}
                    type={Camera.Constants.Type.front}
                    ratio='4:3'
                    style={styles.cmrContainer}>
                  </Camera>
              }

              <View style={styles.camer_button_container}>

                {
                  isShot ?
                    <>
                      <ActivityIndicator
                        animating={isShot}
                        size="large"
                        color={Colors.red800} />
                      <Text style={styles.textStyle}>Đang quét khuôn mặt...</Text>
                    </>
                    :
                    <TouchableOpacity onPress={takePicture} style={styles.capture}>
                      <MaterialIcons name="circle" size={80} color="#fff" />
                    </TouchableOpacity>
                }
              </View>
            </View>
            :
            <View style={{ flex: 9 / 10, alignItems: 'center', justifyContent: 'center' }}>

              {/* <Button
                icon="google-classroom"
                mode="contained"
                onPress={createGroup}
                style={styles.button}>Create group</Button> */}
              <Text style={styles.textStyle}>Nhập họ tên & MSSV</Text>
              <View
                style={{
                  flexDirection: 'row'
                }}>
                <TextInput
                  label='Nhập tên'
                  value={name}
                  mode='outlined'
                  Placeholder='Nhập tên'
                  onChangeText={text => setName(text)}
                />
                <TextInput
                  label='Nhập mssv'
                  mode='outlined'
                  value={mssv}
                  Placeholder='Nhập mssv'
                  onChangeText={text => setMSSV(text)}
                />
              </View>
              <Button
                icon="account-multiple-plus"
                mode="contained"
                onPress={handleCreatePerson}
                style={styles.button}>Create new person</Button>
              {/* <Button
                icon="apple-finder"
                mode="contained"
                onPress={handleAddFace}
                style={styles.button}>Add face</Button> */}
              {/* <Button
                icon="apple-finder"
                mode="contained"
                onPress={() => {
                  setIsReconize(false);
                  setFaceUrl(null);
                  console.log("new shot nè")
                }}
                style={styles.button}>New shot</Button> */}
            </View>
        }
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  topContainer: {
    flex: 1 / 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cmrContainer: {
    flex: 7 / 10
  },
  // bottomContainer: {
  //   flex: 3 / 10,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  textStyle: {
    margin: 10,
    color: '#fff'
  },
  camer_button_container: {
    flex: 2 / 10,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000000'
  },
  button: {
    margin: 10
  },
  nonBlurredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ReconizeCamera