import { Container, Row, FormGroup, Label, Input, Button  } from "reactstrap";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { sendNewMessage, resetMessages} from "../functions";

function Chat({ setShow, setShowMessages }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getMessages = async () => {
    let response = await fetch("https://192.168.0.92:5443/getMessages").catch(
      (error) => console.log(error)
    );
    response = await response.json();
    setMessages(response);
  };

  useEffect(() => {
    setInterval(getMessages, 2000);
  }, []);

  const handleValueChange = (event) =>{
    setNewMessage(event.target.value)
  }

  const sendMessage = () =>{
    sendNewMessage(newMessage);
  }

  const handleHomeClick = () =>{
    setShow(true)
    setShowMessages(false)
    resetMessages()
  }

  return (
    <Container>
      <Row>
        <h1>Messages</h1>
      </Row>
      <Row id="messages">
        {messages.map((message, index) => (
           <Card key={index}>
           <Card.Header>{message.from}</Card.Header>
           <Card.Body>
               <Card.Text>{message.message}</Card.Text>
           </Card.Body>
         </Card>
        ))}
      </Row>
      <Row>
        <FormGroup>
            <Label>Message to send</Label>
            <Input
            type="text"
            name={"message to send"}
            value={newMessage}
            onChange={(event) => handleValueChange(event)}
            ></Input>
        </FormGroup>
        <Button onClick={sendMessage}>Send message</Button>
        <Button onClick={handleHomeClick}>Home</Button>
      </Row>
    </Container>
  );
}

export default Chat;
