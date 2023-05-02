import { useState, useEffect } from "react";
import { Container, Row, Button} from "reactstrap";
import CustomMap from "./CustomMap";
import { resetPosition } from "../functions";

function GetPosition({setShow, setShowPosition}) {
  const [position, setPosition] = useState(false);

  const getPosition = async () => {
    let response = await fetch("https://192.168.1.153:5443/position").catch(
      (error) => console.log(error)
    );
    response = await response.json();
    setPosition(response);
  };

  useEffect(() => {
    setInterval(getPosition, 2000);
  }, []);

  const handleHomeClick = () =>{
    resetPosition()
    setShow(true)
    setShowPosition(false)
  }

  return position ? (
    <Container >
      <Row>
        <div>
          <h1>POSITION</h1>
        </div>
      </Row>
      <div id="map">
        <CustomMap locations={position}></CustomMap>
      <Button 
      id="buttons" 
      className="positionHP"
      onClick={handleHomeClick}>
        Home
      </Button>
      </div>

    </Container>
  ) : (
    <Container>
      <Row>
        <h1 id="waitingForPosition">
          Waiting for the client to send its position...
        </h1>
      </Row>
    </Container>
  );
}


export default GetPosition;
