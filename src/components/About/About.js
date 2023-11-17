import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";

export default function About({ resetData, exportData, importData }) {
  const inputFile = useRef(null);
  let history = useNavigate();
  const [importSpinnerState, setImportSpinnerState] = useState(false);
  const [exportSpinnerState, setExportSpinnerState] = useState(false);
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
            <style>
              {`
      a {
        text-decoration: none;
      }
    `}
            </style>
            <h2 className="text-center">
              <a href="/">Placement Preparation Tracker</a> is your personal
              web-based progress tracker based on <br></br>
              <ul>
              <style>
      {`
        li {
          list-style: none;
          margin-bottom: 10px; /* Add some space between list items */
        }
      `}
    </style>
                <li>
                  <i>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1MVjnBdrosmUxZgxV4XBBENDd_HUdl7Tq/edit?usp=sharing&ouid=111291885373123239410&rtpof=true&sd=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DSA Sheet by Babbar
                    </a>
                  </i>
                </li>
                <li>
                  <i>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1MVjnBdrosmUxZgxV4XBBENDd_HUdl7Tq/edit?usp=sharing&ouid=111291885373123239410&rtpof=true&sd=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Placement Core Subjects
                    </a>
                  </i>
                </li>

                <li>
                  <i>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1MVjnBdrosmUxZgxV4XBBENDd_HUdl7Tq/edit?usp=sharing&ouid=111291885373123239410&rtpof=true&sd=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apptitude Preparation
                    </a>
                  </i>
                </li>
              </ul>
            </h2>
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
                  inputFile.current.click();
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

            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleChange}
            />
          </div>
        </Fade>
      </div>
    </>
  );
}
