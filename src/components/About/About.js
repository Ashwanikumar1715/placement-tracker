import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import "./about.css"

export default function About({
  resetData,
  exportData,
  importData,
  resetCData,
  exportCData,
  importCData,
  resetAData,
  exportAData,
  importAData,
  setQuestionData, // corrected prop name
  setCoreSubjectData, // corrected prop name
  setApptitudeData, // corrected prop name
}) 
 {
  const inputFile1 = useRef(null);
  const inputFile2 = useRef(null);
  const inputFile3 = useRef(null);
  let history = useNavigate();
  const [importSpinnerState, setImportSpinnerState] = useState(false);
  const [exportSpinnerState, setExportSpinnerState] = useState(false);
  const [importSpinnerCState, setImportSpinnerCState] = useState(false);
  const [exportSpinnerCState, setExportSpinnerCState] = useState(false);
  const [importSpinnerAState, setImportSpinnerAState] = useState(false);
  const [exportSpinnerAState, setExportSpinnerAState] = useState(false);
  // About component takes resetData() from App <Component> to trigger DB data reset
  function handleChange(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const JSONData = JSON.parse(e.target.result);
      importData(JSONData, () => {
        setImportSpinnerState(false);
        history.push("/");
      });
    };
  }
  function handleChangeC(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const JSONData = JSON.parse(e.target.result);
      importCData(JSONData, () => {
        setImportSpinnerCState(false);
        history.push("/");
      });
    };
  }
  function handleChangeA(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const JSONData = JSON.parse(e.target.result);
      importAData(JSONData, () => {
        setImportSpinnerAState(false);
        history.push("/");
      });
    };
  }
  return (
    <>
      <div className="container">
        <Fade duration={500}>
          <div className="container my-5">
            <Alert variant="success">
              <Alert.Heading className="text-center">About</Alert.Heading>
              <hr />
              <h4 className="text-center">
                This is a personalized self paced platform that helps you build
                your confidence in solving any coding <br /> related question
                and helps you prepare for your placements{" "}
                <span role="img" aria-label="student">
                  👨🏻‍🎓
                </span>
              </h4>
            </Alert>
          </div>
          <div className="container my-5">
            <h4 className="text-center my-5">
              I{" "}
              <a
                href="https://www.linkedin.com/in/ashwani-kumar1715"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ashwani Kumar
              </a>{" "}
              <span role="img" aria-label="code-men">
                Welcomes you all!👨🏻‍💻
              </span>
            </h4>
            <h5 className="text-center">
             <span className="dsa"> Dsa Tracking</span>
              
              <br/>
              <Badge
                variant="danger"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to reset the progress !"
                    )
                  ) {
                    setExportSpinnerState(true);
                    resetData();
                  }
                }}
              >
                Reset Progress
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={exportSpinnerState ? {} : { display: "none" }}
                />
              </Badge>{" "}
              <Badge
                variant="warning"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setExportSpinnerState(true);
                  exportData(() => {
                    setExportSpinnerState(false);
                  });
                }}
              >
                Export Progress
              </Badge>{" "}
              <Badge
                variant="primary"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setImportSpinnerState(true);
                  inputFile1.current.click();
                }}
              >
                Import Progress{" "}
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={importSpinnerState ? {} : { display: "none" }}
                />
              </Badge>
            </h5>

            <h5 className="text-center">
             <span className="dsa">Core Subjects</span>
             
              <br/>
              <Badge
                variant="danger"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to reset the progress !"
                    )
                  ) {
                    setExportSpinnerCState(true);
                    resetCData();
                  }
                }}
              >
                Reset Progress
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={exportSpinnerCState ? {} : { display: "none" }}
                />
              </Badge>{" "}
              <Badge
                variant="warning"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setExportSpinnerCState(true);
                  exportCData(() => {
                    setExportSpinnerCState(false);
                  });
                }}
              >
                Export Progress
              </Badge>{" "}
              <Badge
                variant="primary"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setImportSpinnerCState(true);
                  inputFile2.current.click();
                }}
              >
                Import Progress{" "}
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={importSpinnerCState ? {} : { display: "none" }}
                />
              </Badge>
            </h5>

            <h5 className="text-center">
             <span className="dsa">Apptitude</span>
             
              <br/>
              <Badge
                variant="danger"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to reset the progress !"
                    )
                  ) {
                    setExportSpinnerAState(true);
                    resetAData();
                  }
                }}
              >
                Reset Progress
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={exportSpinnerAState ? {} : { display: "none" }}
                />
              </Badge>{" "}
              <Badge
                variant="warning"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setExportSpinnerAState(true);
                  exportAData(() => {
                    setExportSpinnerAState(false);
                  });
                }}
              >
                Export Progress
              </Badge>{" "}
              <Badge
                variant="primary"
                as="a"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setImportSpinnerAState(true);
                  inputFile3.current.click();
                }}
              >
                Import Progress{" "}
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={importSpinnerAState ? {} : { display: "none" }}
                />
              </Badge>
            </h5>

            <input
              type="file"
              id="file"
              ref={inputFile1}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleChange}
            />
              <input
              type="file"
              id="file"
              ref={inputFile2}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleChangeC}
            />
              <input
              type="file"
              id="file"
              ref={inputFile3}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleChangeA}
            />
          </div>
        </Fade>
      </div>
    </>
  );
}
