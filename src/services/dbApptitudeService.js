import Localbase from "localbase";
import ApptitudeData ,{ version } from "../ApptitudeData";
let db = new Localbase("ddb");
window.db = db;
db.config.debug = false;
const localVersion = localStorage.getItem("versionApptitude");
window.localVersion = localVersion;
window.version = version;

export function insertApptitudeData(callback) {
	ApptitudeData.forEach((topic, index) => {
		db.collection("ApptitudeArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	getApptitudeData(callback);
}


export function getApptitudeData(callback) {
	db.collection("ApptitudeArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				insertApptitudeData(callback);
			} else {
				data.sort((a, b) => {
					return a.position - b.position;
				});
				if (localVersion === null || localVersion === undefined) {
					localStorage.setItem("versionApptitude", 100000007);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}

				if (parseInt(localVersion) !== version) {
					let i = 0;
					for (let topic of data) {
						let dataFromJSON = ApptitudeData[i].questions;
						let len = dataFromJSON.length;
						let key = topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
						topic.questions.forEach((qObj, index) => {
							if (index < len) {
								if (qObj.Done) {
									dataFromJSON[index]["Done"] = true;
								}
								if (qObj.hasOwnProperty("Bookmark")) {
									dataFromJSON[index]["Bookmark"] = qObj.Bookmark;
								} else {
									dataFromJSON[index]["Bookmark"] = false;
								}
								if (qObj.hasOwnProperty("Notes")) {
									dataFromJSON[index]["Notes"] = qObj.Notes;
								} else {
									dataFromJSON[index]["Notes"] = "";
								}
							}
						});
						updateApptitudeDBData(key, {
							started: topic.started,
							doneQuestions: topic.doneQuestions,
							questions: dataFromJSON,
						});
						i++;
					}
					localStorage.setItem("versionApptitude", version);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				} else {
					return callback(data);
				}
			}
		});
}
export function getApptitudeTopicData(key, callback) {
	db.collection("ApptitudeArchive")
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function updateApptitudeDBData(key, updateData) {
	db.collection("ApptitudeArchive").doc(key).update(updateData);
}

export function resetApptitudeDBData(callback) {
	db.collection("ApptitudeArchive")
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else", error);
		});
}

export function exportApptitudeDBData(callback) {
	db.collection("ApptitudeArchive")
		.get()
		.then((data) => {
			callback(data);
		});
}

export function importApptitudeDBData(data, callback) {
	resetApptitudeDBData((response) => {
		new Promise((resolve, reject) => {
			data.forEach((topic, index) => {
				db.collection("ApptitudeArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				if (index === data.length - 1) {
					resolve();
				}
			});
		}).then(() => {
			getApptitudeData((data) => {
				callback(data);
			});
		});
	});
}
