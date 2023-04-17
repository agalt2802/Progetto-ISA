import {useState, useEffect} from 'react';
import { Container, Row} from "reactstrap";
import Nav from "react-bootstrap/Nav";
import'./App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
// import "./styles.css";

function App() {
  const [connected, setConnected] = useState(true);
  const [device, setDevice] = useState("")

  useEffect(() => {
    async function checkConnectionToClient() {
      const response = await fetch("https://192.168.1.153:5443/connection").catch(
        (error) => console.log(error)
      );
      const json = await response.json();
      console.log(json)
      setConnected(json)
    }
    checkConnectionToClient();
  }, [connected]);

  const handleSelectComponent = (key) => {
    console.log(key)
  }

  return (
    <Container>
      <Row>
        <div>
          <h1>SERVER</h1>
        </div>
      </Row>
      {
        connected &&
        <div id="connected">
          <p>Connected: {JSON.stringify(connected)}</p> 
        </div>
      }
      {/* <Row>
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
      </Row> */}
    </Container>
  );
}

export default App;
