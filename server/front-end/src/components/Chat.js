import { Container, Row, FormGroup, Label, Input, Button  } from "reactstrap";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { sendNewMessage } from "../functions";

function Chat({ setShow, setShowmessages }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getMessages = async () => {
    let response = await fetch("https://192.168.1.153:5443/getMessages").catch(
      (error) => console.log(error)
    );
    response = await response.json();
    setMessages(response);
  };

  useEffect(() => {
    setInterval(getMessages, 10000);
  }, []);

  const handleValueChange = (event) =>{
    setNewMessage(event.target.value)
  }

  const sendMessage = () =>{
    sendNewMessage(newMessage);
  }

  // let messages = ["hello", "hi, from the server"];

  return (
    <Container>
      <Row>
        <h1>Messages</h1>
      </Row>
      <Row id="messages">
        {messages.map((message, index) => (
           <Card>
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
      </Row>
    </Container>
  );
}

export default Chat;
