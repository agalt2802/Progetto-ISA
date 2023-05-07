import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { takePhoto, getPosition, getBatteryInfo } from "./functions";
import ListGroup from "react-bootstrap/ListGroup";
import { checkConnectionToClient } from "./functions";

import TakePhoto from "./components/TakePhoto";
import Chat from "./components/Chat";
import GetPosition from "./components/GetPosition";
import BatteryStatus from "./components/BatteryStatus";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [device, setDevice] = useState(false);
  const [connected, setConnetcted] = useState(false);
  const [show, setShow] = useState(true);
  const [sentTakePhoto, setSentTakePhoto] = useState(false);
  const [showPosition, setShowPosition] = useState(false);
  const [showBattery, setShowBattery] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const isConnected = async () => {
    try{
    let response = await fetch("https://192.168.0.92:5443/isConnected")
    response = await response.json();
    if (response) {
      setConnetcted(true);
      setDevice(response);
    } else {
      setConnetcted(false);
    }
    }catch(error){
      console.log(error)
    }
    
  };
  useEffect(() => {
    setInterval(isConnected, 10000);
  }, []);

  const handleTakePhoto = () => {
    takePhoto();
    setShow(false);
    setSentTakePhoto(true);
  };

  const handleGetPosition = () => {
    getPosition();
    setShow(false);
    setShowPosition(true);
  };

  const handleGetBatteryInfo = () => {
    getBatteryInfo();
    setShow(false);
    setShowBattery(true);
  };

  const handleStartChat = () => {
    setShow(false);
    setShowMessages(true);
  };

  return (
    <Container id="mainContainer">
      <Row id="pageTitle">
        <div>
          <h1>SERVER</h1>
        </div>
      </Row>
      {!connected && (
        <Row>
          <h1 id="notConnected">Waiting for client to connect...</h1>
        </Row>
      )}
      {connected && (
        <Container>
          <Row>
            {/* <Col> */}
            <div id="connected">
              <Card>
                <Card.Header>Connected Device</Card.Header>
                <Card.Body>
                  <Row>
                    <Card.Text>Device model: {device.deviceInfo[0]}</Card.Text>
                    <Card.Text>
                      Device platform: {device.deviceInfo[1]}
                    </Card.Text>
                    {device.deviceInfo[1]==="Android" ? 
                    <Card.Text>
                    Device Manufacturer: {device.deviceInfo[2]}
                  </Card.Text>
                    :null }
                  </Row>
                </Card.Body>
              </Card>
            </div>
            {/* </Col> */}
            {/* <Col> */}
            {show && (
              <div>
                <Row>
                  <Button className="HpButtons" onClick={handleTakePhoto}>
                    TAKE PHOTO
                  </Button>
                </Row>
                <Row>
                  <Button className="HpButtons" onClick={handleStartChat}>
                    START CHAT
                  </Button>
                </Row>
                <Row>
                  <Button className="HpButtons" onClick={handleGetPosition}>
                    GET POSITION
                  </Button>
                </Row>
                <Row>
                  <Button className="HpButtons" onClick={handleGetBatteryInfo}>
                    BATTERY INFO
                  </Button>
                </Row>
              </div>
            )}
          </Row>

          {sentTakePhoto && (
            <TakePhoto setShow={setShow} setSentTakePhoto={setSentTakePhoto} />
          )}

          {showPosition && (
            <GetPosition setShow={setShow} setShowPosition={setShowPosition} />
          )}
          {showBattery && (
            <BatteryStatus setShow={setShow} setShowBattery={setShowBattery} />
          )}
          {showMessages && (
            <Chat setShow={setShow} setShowMessages={setShowMessages} />
          )}
        </Container>
      )}
    </Container>
  );
}

export default App;
