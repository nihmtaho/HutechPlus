const SubjectsListScreen = ({ navigation }) => {
	const [dataRoom, setDataRoom] = useState([]);
	const [test, setTest] = useState({
		subjectCode: "",
		subjectName: "",
	});
	const [listFound, setListFound] = useState(undefined);

	// const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			let idUsername;
			try {
				idUsername = await AsyncStorage.getItem("username");
				db.ref("Students/" + idUsername + "/schedule/").once(
					"value",
					(Snapshot) => {
						tempData = Snapshot.val();
					}
				);
				setTimeout(() => {
					_findSubjectLearning();
				}, 1000);
			} catch (error) {}
		})();
		return () => {
			// console.log("Out Screen...");
		};
	}, []);

	const _findSubjectLearning = () => {
		for (let i = 0; i < tempData.length; i++) {
			const element = tempData[i];
			const convertObject = Object.values(element)[1]; // Get value index 1
			for (let i = 0; i < convertObject.length; i++) {
				const element = convertObject[i];
				listIdSubject.push(element);
			}
		}
		for (let i = 0; i < listIdSubject.length; i++) {
			const data = Object.values(listIdSubject[i])[1];
			subjectItem.push(data);
		}
		unique = [...new Set(subjectItem)];
		setListFound({ ...unique });

		let subjectId_log;
		let subjectName_log;
		// for (let i = 0; i < Object.values(listFound).length; i++) {
		// 	const subjectCode_log = Object.values(listFound)[i];
		// 	console.log(subjectCode_log);
		// 	// Fetch info Subjects
		// 	db.ref("Subject/" + subjectCode_log + "/").once("value", (Snapshot) => {
		// 		subjectId_log = Snapshot.child("subjectId").val();
		// 		subjectName_log = Snapshot.child("subjectName").val();
		// 		console.log(subjectId_log, subjectName_log);
		// 		dataSubject.push({
		// 			"id": Snapshot.child("subjectId").val(),
		// 			"name": Snapshot.child("subjectName").val()
		// 		})
		// 	});
		// }
		ToastAndroid.show("Function is run", ToastAndroid.SHORT);
		
	};

	const _addSubjectLearning = () => {};

	const _fetchSubjectInfo = async () => {
		for (const key in listFound) {
			if (listFound.hasOwnProperty(key)) {
				const element = listFound[key];
				console.log(element);
			}
		}
	};

	const _actionTest = () => {
		// Alert.alert("Thông báo", "_onPress", [
		// 	{
		// 		text: "OK",
		// 		style: "cancel",
		// 	},
		// ]);
	};

	const _renderRow = ({ item }) => {
		return <ListSubject dataProps={item} />;
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					backgroundColor: "#f08a5d",
					paddingTop: Constants.statusBarHeight + 8,
					height: 110,
					borderBottomStartRadius: 32,
					borderBottomEndRadius: 32,
					display: "flex",
					justifyContent: "flex-end",
					paddingBottom: 8,
				}}
			>
				<TouchableOpacity
					style={{
						position: "absolute",
						top: Constants.statusBarHeight,
						left: 2,
						padding: 14,
					}}
					onPress={() => navigation.goBack()}
				>
					<MaterialIcons name="arrow-back" size={26} color="#fff" />
				</TouchableOpacity>
				<Title style={{ color: "#fff", textAlign: "center" }}>
					CHỌN MÔN HỌC
				</Title>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					Chọn một môn học để xem nhật kí điểm danh
				</Caption>
			</View>
			{/* <Text>{JSON.stringify(listFound)}</Text> */}
			<Text>{JSON.stringify(listFound)}</Text>
			<Text>list data: {JSON.stringify(dataRoom)}</Text>
			<Button
				onPress={() => _findSubjectLearning()}
			>Reload Data</Button>
			{/* <FlatList
				style={{ marginTop: 8 }}
				data={data_log}
				renderItem={_renderRow}
				keyExtractor={(item) => item.subjectCode}
			/> */}
			{/* {isLoading ? (
				<ActivityIndicator style={{ padding: 28 }} color="#f6ab6c" />
			) : (
				<FlatList
					style={{ marginTop: 8 }}
					data={data_log}
					renderItem={_renderRow}
					keyExtractor={(item) => item.subjectCode}
				/>
			)} */}
			{/* </View> */}
			<StatusBar style="auto" />
		</View>
	);
};