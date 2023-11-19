import { React, useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import {
  getData,
  updateDBData,
  resetDBData,
  exportDBData,
  importDBData,
} from "./services/dbServices";
import Spinner from "react-bootstrap/Spinner";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicCard from "./components/TopicCard/TopicCard";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Topic from "./components/Topic/Topic";
import logo from "./eren.jpg";

import CoreSubjects from "./components/TopicCard/CoreSubject";
import {
  exportCoreDBData,
  getCoreData,
  importCoreDBData,
  resetCoreDBData,
  updateCoreDBData,
} from "./services/dbCoreService";
import CoreTopic from "./components/Topic/CoreTopic";
import {
  exportApptitudeDBData,
  getApptitudeData,
  importApptitudeDBData,
  resetApptitudeDBData,
  updateApptitudeDBData,
} from "./services/dbApptitudeService";
import ApptitudeCard from "./components/TopicCard/ApptitudeCard";
import ApptitudeTopic from "./components/Topic/ApptitudeTopic";

// Creating a theme context
export const ThemeContext = createContext(null);

function App() {
  // setting state for data received from the DB

  const [questionData, setquestionData] = useState([]);

  const [coreSubjectData, setCoreSubjectData] = useState([]);

  const [apptitudeData, setApptitudeData] = useState([]);

  // if dark theme is enabled or not
  const [dark, setDark] = useState(false);

  // useEffect for fetching data from DB on load and init GA
  useEffect(() => {
    localStorage.removeItem("cid");

    getData((QuestionData) => {
      setquestionData(QuestionData);
    });

    getCoreData((CoreSubjectData) => {
      setCoreSubjectData(CoreSubjectData);
    });
    getApptitudeData((ApptitudeData) => {
      setApptitudeData(ApptitudeData);
    });

    //implementing dark theme mode option
    // checking if dark mode "isDark" is already declared or not
    if (!("isDark" in window.localStorage)) {
      window.localStorage.setItem("isDark", dark);
    } else {
      // initialising the value of dark with the already stored value
      let temp = window.localStorage["isDark"];
      if (temp === "false") {
        setDark(false);
      } else {
        setDark(true);
      }
    }
  }, [dark]);

  //to update progress in '/' route and also update DB
  function updateData(key, topicData, topicPosition) {
    let reGenerateUpdatedData = questionData.map((topic, index) => {
      if (index === topicPosition) {
        updateDBData(key, topicData);
        return {
          topicName: topic.topicName,
          position: topic.position,
          ...topicData,
        };
      } else {
        return topic;
      }
    });
    setquestionData(reGenerateUpdatedData);
  }
  function updateCoreData(key, topicData, topicPosition) {
    let reGenerateUpdatedData = coreSubjectData.map((topic, index) => {
      if (index === topicPosition) {
        updateCoreDBData(key, topicData);
        return {
          topicName: topic.topicName,
          position: topic.position,
          ...topicData,
        };
      } else {
        return topic;
      }
    });
    setCoreSubjectData(reGenerateUpdatedData);
  }

  function updateApptitudeData(key, topicData, topicPosition) {
    let reGenerateUpdatedData = coreSubjectData.map((topic, index) => {
      if (index === topicPosition) {
        updateApptitudeDBData(key, topicData);
        return {
          topicName: topic.topicName,
          position: topic.position,
          ...topicData,
        };
      } else {
        return topic;
      }
    });
    setApptitudeData(reGenerateUpdatedData);
  }

  // reset and clear DB
  function resetData() {
    resetDBData((response) => {
      setquestionData([]);
      window.location.replace(window.location.origin);
    });
  }
  function resetCoreData() {
    resetCoreDBData((response) => {
      setCoreSubjectData([]);
      window.location.replace(window.location.origin);
    });
  }
  function resetApptitudeData() {
    resetApptitudeDBData((response) => {
      setApptitudeData([]);
      window.location.replace(window.location.origin);
    });
  }

  // export 450DSA-Progress data

  function exportCoreData(callback) {
    exportCoreDBData((data) => {
      const fileData = JSON.stringify(data);
      const blob = new Blob([fileData], { type: "text/plain" });
      saveAs(blob, "progress.json");
      callback();
    });
  }
  function exportData(callback) {
    exportDBData((data) => {
      const fileData = JSON.stringify(data);
      const blob = new Blob([fileData], { type: "text/plain" });
      saveAs(blob, "progress.json");
      callback();
    });
  }

  function exportApptitudeData(callback) {
    exportApptitudeDBData((data) => {
      const fileData = JSON.stringify(data);
      const blob = new Blob([fileData], { type: "text/plain" });
      saveAs(blob, "progress.json");
      callback();
    });
  }

  // import 450DSA-Progress data

  function importData(data, callback) {
    importDBData(data, (QuestionData) => {
      setquestionData(QuestionData);
      callback();
    });
  }

  function importCoreData(data, callback) {
    importCoreDBData(data, (QuestionData) => {
      setCoreSubjectData(QuestionData);
      callback();
    });
  }
  function importApptitudeData(data, callback) {
    importApptitudeDBData(data, (QuestionData) => {
      setApptitudeData(QuestionData);
      callback();
    });
  }

  return (
    <div className={dark ? "App dark" : "App"}>
      <h1 className="app-heading " style={{ color: dark ? "white" : "" }}>
        <img className="img_logo" src={logo} alt="logo" />
        <div>
          <p className="motivation">
            {" "}
            <a href="/"> Home</a>
            <a href="/coresubjects"> Core Subjects</a>
            <a href="/apptitude">Apptitude</a>
          </p>
        </div>
        <div className="text-center  float-sm-right">My Placement Tracker</div>
        <br />
      </h1>

      {questionData.length === 0 ? (
        // load spinner until data is fetched from DB
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <>
          <ThemeContext.Provider value={dark}>
            <Routes>
              <Route
                exact
                path="/"
                element={<TopicCard questionData={questionData}></TopicCard>}
              />
              <Route
                exact
                path="/coresubjects"
                element={
                  <CoreSubjects questionData={coreSubjectData}></CoreSubjects>
                }
              />
              <Route
                exact
                path="/apptitude"
                element={
                  <ApptitudeCard questionData={apptitudeData}></ApptitudeCard>
                }
              />
              <Route
                path="/about"
                element={
                  <About
                    resetData={resetData}
                    exportData={exportData}
                    importData={importData}
                   
                    resetCData={resetCoreData}
                    exportCData={exportCoreData}
                    importCData={importCoreData}
                    
                    resetAData={resetApptitudeData}
                    exportAData={exportApptitudeData}
                    importAData={importApptitudeData}

                    setQuestionData={setquestionData}
                    setCoreSubjectData={setCoreSubjectData}
                    setApptitudeData={setApptitudeData}
                  ></About>
                }
              />

              <Route
                path="/array"
                element={
                  <Topic data={questionData[0]} updateData={updateData} />
                }
              />
              <Route
                path="/matrix"
                element={
                  <Topic data={questionData[1]} updateData={updateData} />
                }
              />
              <Route
                path="/string"
                element={
                  <Topic data={questionData[2]} updateData={updateData} />
                }
              />
              <Route
                path="/search_sort"
                element={
                  <Topic data={questionData[3]} updateData={updateData} />
                }
              />
              <Route
                path="/linked_list"
                element={
                  <Topic data={questionData[4]} updateData={updateData} />
                }
              />
              <Route
                path="/binary_trees"
                element={
                  <Topic data={questionData[5]} updateData={updateData} />
                }
              />
              <Route
                path="/bst"
                element={
                  <Topic data={questionData[6]} updateData={updateData} />
                }
              />
              <Route
                path="/greedy"
                element={
                  <Topic data={questionData[7]} updateData={updateData} />
                }
              />
              <Route
                path="/backtracking"
                element={
                  <Topic data={questionData[8]} updateData={updateData} />
                }
              />
              <Route
                path="/stacks_queues"
                element={
                  <Topic data={questionData[9]} updateData={updateData} />
                }
              />
              <Route
                path="/heap"
                element={
                  <Topic data={questionData[10]} updateData={updateData} />
                }
              />
              <Route
                path="/graph"
                element={
                  <Topic data={questionData[11]} updateData={updateData} />
                }
              />
              <Route
                path="/trie"
                element={
                  <Topic data={questionData[12]} updateData={updateData} />
                }
              />
              <Route
                path="/dynamic_programming"
                element={
                  <Topic data={questionData[13]} updateData={updateData} />
                }
              />
              <Route
                path="/bit_manipulation"
                element={
                  <Topic data={questionData[14]} updateData={updateData} />
                }
              />
              <Route path="/" element={<App />} />

              {/* core subjects */}
              <Route
                path="/operating_system"
                element={
                  <CoreTopic
                    data={coreSubjectData[0]}
                    updateData={updateCoreData}
                  />
                }
              />
              <Route
                path="/computer_networks"
                element={
                  <CoreTopic
                    data={coreSubjectData[1]}
                    updateData={updateCoreData}
                  />
                }
              />
              <Route
                path="/compiler_design"
                element={
                  <CoreTopic
                    data={coreSubjectData[2]}
                    updateData={updateCoreData}
                  />
                }
              />
              <Route
                path="/database_managment_system"
                element={
                  <CoreTopic
                    data={coreSubjectData[3]}
                    updateData={updateCoreData}
                  />
                }
              />

              <Route
                path="/quantitative_aptitude"
                element={
                  <ApptitudeTopic
                    data={apptitudeData[0]}
                    updateData={updateApptitudeData}
                  />
                }
              />
               <Route
                path="/verbal_ability"
                element={
                  <ApptitudeTopic
                    data={apptitudeData[1]}
                    updateData={updateApptitudeData}
                  />
                }
              />
               <Route
                path="/logical_reasoning"
                element={
                  <ApptitudeTopic
                    data={apptitudeData[2]}
                    updateData={updateApptitudeData}
                  />
                }
              />
               <Route
                path="/future_update_topic"
                element={
                  <ApptitudeTopic
                    data={apptitudeData[3]}
                    updateData={updateApptitudeData}
                  />
                }
              />
              
            </Routes>
          </ThemeContext.Provider>
        </>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footer dark={dark} setDark={setDark}></Footer>
    </div>
  );
}

export default App;
