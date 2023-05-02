import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';

import "./App.css"

function HomePage() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState("");

  useEffect(() => {
    async function checkConnectionToClient() {
      let response = await fetch("https://192.168.1.153:5443/checkConnection").catch(
        (error) => console.log(error)
      );
      const json = await response.json();
      console.log("JSON: " + json)
      setConnected(json);
      // if (json) {
      //   response = await fetch("https://192.168.1.153:5443/device").catch(
      //     (error) => console.log(error)
      //   );
      //   let deviceInfo = await response.json();
      //   setDevice(deviceInfo);
      // } else {
      //   console.log("retry");
      //   setInterval(checkConnectionToClient, 10000);
      // }
    }
    checkConnectionToClient();
  }, [connected, device]);

  const handleSelectComponent = (key) => {
    console.log(key);
  };

  return (
    <Container>
      <Row>
        <div>
          <h1 style={{backgroundColor:'red'}}>SERVER</h1>
        </div>
      </Row>
      {connected && (
        <div id="connected">
          <Card>
            <Card.Header>Connected Device</Card.Header>
            <Card.Body>
              <Card.Text>
                Device Model: {JSON.stringify(device)}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      )}
      <Row>
        <Nav justify variant="tabs" onSelect={(selectedKey) => handleSelectComponent(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey={"TakePhoto"} >TAKE A PHOTO</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"SendMessage"} >START A CHAT</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"CreateCron"}  >CREATE CRON</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"EditCron"}  >EDIT CRON</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"ViewLogs"}  >VIEW LOGS</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
    </Container>
  );
}

export default HomePage;
