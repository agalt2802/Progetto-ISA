import { useState, useEffect } from "react";
import { Container, Row, Button } from "reactstrap";
import { Card } from "react-bootstrap";
import {resetBatteryInfo} from "../functions"

function BatteryStatus({ setShow, setShowBattery }) {
  const [battery, setBattery] = useState(false);

  const getBattery = async () => {
    let response = await fetch("https://192.168.0.92:5443/battery").catch(
      (error) => console.log(error)
    );
    response = await response.json();
    setBattery(response);
  };

  useEffect(() => {
    setInterval(getBattery, 2000);
  }, []);

  const handleHomeClick = () =>{
    resetBatteryInfo()
    setShow(true)
    setShowBattery(false)

  }

  return battery ? (
    <Container>
      <div>
        <h1>BATTERY STATUS</h1>
      </div>
      <Card>
        <Card.Header>Battery Info</Card.Header>
        <Card.Body>
          <Row>
            <Card.Text>Level: {battery.level}</Card.Text>
            <Card.Text>
              Is Plugged: {JSON.stringify(battery.charging)}
            </Card.Text>
          </Row>
        </Card.Body>
      </Card>
      <Button id="buttons"  onClick={handleHomeClick}>
        Home
      </Button>
    </Container>
  ) : (
    <Container>
      <Row>
        <h1 id="waitingForPhoto"> Waiting for battery status...</h1>
      </Row>
    </Container>
  );
}

export default BatteryStatus;
