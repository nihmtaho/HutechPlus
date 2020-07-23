import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  AsyncStorage,
} from 'react-native';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';
import {
  Provider as PaperProvider,
  ActivityIndicator,
  Colors,
  Button,
  Text,
} from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import { getPreciseDistance, isPointWithinRadius } from 'geolib';
import Config from '../config.json'

console.disableYellowBox = true;

const DetailScreen = ({ navitgation }) => {

  const [errorMsg, setErrorMsg] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [checkinStatus, setCheckinStatus] = useState(false);
  const [withinClass, setWithinClass] = useState(false);
  const [radius, setRadius] = useState(1000);
  const toggleSwitch = () => setCheckinStatus(previousState => !previousState);
  // const [checkinStatus, setCheckinStatus] = useState();
  // const [isEnabled, setIsEnabled] = useState(false);

  // Tuan's home
  // 10.802919, 106.715229
  // 10.802795, 106.715138
  // fail location 10.803674, 106.688265
  // temp data, waiting for teacher's app setting
  const [teacherLocation, setTeacherLocation] = useState({ latitude: 10.802795, longitude: 106.715138 });

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

      let get_mssv = await AsyncStorage.getItem("username");
      setMSSV(get_mssv);
      let { locationStatus } = await Location.requestPermissionsAsync();
      if (locationStatus !== 'granted') {
        setErrorMsg('Quyền truy cập vị trí đã bị từ chối');
      }

      let location = await Location.getCurrentPositionAsync({});

      const { cameraStatus } = await Camera.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted');

      setMyLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      setWithinClass(isPointWithinRadius(
        myLocation,
        teacherLocation,
        radius
      ))

      try {
        db.ref("Students/" + this.state.mssv + "/schedule/").on(
          "value",
          (Snapshot) => {
            get = Snapshot.val();
            Snapshot.forEach((element) => {
              dateData.push(element.child("date").val());
            });
          }
        );
      } catch (error) { }

    })();

  });

  // const toggleSwitch = (checkIn) => {
  //   setCheckinStatus(checkIn);
  // }

  let text = 'Đang kiểm tra vị trí..';
  if (errorMsg) {
    text = errorMsg;
  } else if (myLocation) {
    text = 'latitude: ' + myLocation.latitude + '\nlongitude: ' + myLocation.longitude
  }

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.2, base64: true });
    setFaceUri(photo.uri)
    setIsShot(true)
    const uploadResult = await uploadImage(photo.base64) // return image link
    if (!uploadResult) {
      Alert.alert(
        "Xử lý ảnh lỗi",
        "Vui lòng chụp lại",
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
        "Điểm danh không thành công",
        "Vui lòng chụp hình chỉ chứa 1 khuôn mặt",
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
        "Không tìm thấy thông tin sinh viên",
        "Tạo thông tin sinh viên mới",
        [
          {
            text: "Hủy"
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

    const mssvResult = await getPerson(identityResult)
    if (mssvResult) {

      if (mssvResult == mssv) {
        handleAddFace(identityResult, uploadResult);

        /** Then
       *  Redirect to AttendanceSuccess.js
       */

        // Alert.alert(
        //   "Detect success",
        //   "Xin chào " + name + ",\nđiểm danh thành công",
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => {
        //         setIsShot(false)
        //       }
        //     },
        //   ]
        // )

      } else {
        Alert.alert(
          'Điểm danh không thành công',
          'Vui lòng điểm danh đúng người',
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

    } else {
      Alert.alert(
        'Không thể truy vấn dữ liệu',
        'Vui lòng kiểm tra đường truyền',
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
    // setMSSV(personMSSV)
    return personMSSV;
  }

  return (
    <PaperProvider>
      <View style={styles.topContainer}></View>
      <View style={styles.container}>
        {
          myLocation && withinClass && !isShot &&
          <>
            <Camera
              ref={cameraRef}
              type={Camera.Constants.Type.front}
              ratio='4:3'
              style={styles.cmrContainer}>
            </Camera>

            <TouchableOpacity onPress={takePicture} style={styles.btnContainer}>
              <MaterialIcons name="circle" size={80} color="#fff" />
            </TouchableOpacity>
          </>
        }
        {
          myLocation && withinClass && isShot &&
          <>
            <View style={styles.cmrContainer}>
              <Image style={styles.blurredImage} source={{ faceUri }} />
              <BlurView intensity={250} style={[StyleSheet.absoluteFill, styles.cmrContainer]}>
              </BlurView>
            </View>

            <View style={styles.btnContainer}>
              <ActivityIndicator
                animating={isShot}
                size="large"
                color={Colors.red800} />
              <Text style={styles.textStyle}>Đang quét khuôn mặt...</Text>
            </View>
          </>
        }
        {
          myLocation && !withinClass &&
          <View>
            <Text>Bạn ở ngoài lớp học</Text>
            <Text>Không thể điểm danh</Text>
          </View>
        }
        {
          !myLocation &&
          <View>
            {/* Chưa có location */}
            <Text>{text}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({



  topContainer: {
    flex: 1 / 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    tintColor: "#fff"
    // paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 9 / 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000'
  },



  textStyle: {
    margin: 10,
    color: '#fff'
  },
  btnContainer: {
    flex: 3 / 10,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  button: {
    margin: 10
  },
  nonBlurredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cmrContainer: {
    width: "100%",
    flex: 7 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
})

export default DetailScreen