import Localbase from "localbase";

import CoreSubjectData ,{ version } from "../CoreSubjects";
let db = new Localbase("db");
window.db = db;
db.config.debug = false;
const localVersion = localStorage.getItem("version");
window.localVersion = localVersion;
window.version = version;

export function insertData(callback) {
	CoreSubjectData.forEach((topic, index) => {
		db.collection("CoreArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
	});
	getCoreData(callback);
}


export function getCoreData(callback) {
	db.collection("CoreArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				insertData(callback);
			} else {
				data.sort((a, b) => {
					return a.position - b.position;
				});
				if (localVersion === null || localVersion === undefined) {
					localStorage.setItem("version", 100000000);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}

				if (parseInt(localVersion) !== version) {
					let i = 0;
					for (let topic of data) {
						let dataFromJSON = CoreSubjectData[i].questions;
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
						updateCoreDBData(key, {
							started: topic.started,
							doneQuestions: topic.doneQuestions,
							questions: dataFromJSON,
						});
						i++;
					}
					localStorage.setItem("version", version);
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				} else {
					return callback(data);
				}
			}
		});
}
export function getCoreTopicData(key, callback) {
	db.collection("CoreArchive")
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function updateCoreDBData(key, updateData) {
	db.collection("CoreArchive").doc(key).update(updateData);
}

export function resetCoreDBData(callback) {
	db.collection("CoreArchive")
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else", error);
		});
}

export function exportCoreDBData(callback) {
	db.collection("450dsaArchive")
		.get()
		.then((data) => {
			callback(data);
		});
}

export function importCoreDBData(data, callback) {
	resetCoreDBData((response) => {
		new Promise((resolve, reject) => {
			data.forEach((topic, index) => {
				db.collection("CoreArchive").add(topic, topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase());
				if (index === data.length - 1) {
					resolve();
				}
			});
		}).then(() => {
			getCoreData((data) => {
				callback(data);
			});
		});
	});
}
