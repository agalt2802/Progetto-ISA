import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import { resetImage, takePhoto, savePhoto, overwrite} from "../functions";
import {Modal} from "react-bootstrap";
import { use } from "chai";

function TakePhoto({setShow, setSentTakePhoto}) {
  const [img, setImg] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showFileExistsModal, setShowFileExistsModal] = useState(false)
  // const takePhoto = async () => {
  //   await fetch("https://192.168.0.92:5443/takePhoto").catch(
  //     (error) => console.log(error)
  //   );
  // };

  const getPicture = async () => {
    let response = await fetch("https://192.168.0.92:5443/pictureTaken").catch(
      (error) => console.log(error)
    );
    response = await response.text();
    setImg(response)
  };

  useEffect(() => {
    setInterval(getPicture, 2000)
  }, []);

  const handleHomeClick = () =>{
    resetImage()
    setShow(true)
    setSentTakePhoto(false)
  }

  const handleTakeNewPhoto = () => {
    resetImage()
    takePhoto()
  }

  const handleSavePhoto = () =>{
    setShowSaveModal(true)
  }

  const handleConfirmSaveEdit = async () =>{
    console.log(img)
    console.log(fileName)
    let response = await savePhoto(fileName, img);
    console.log(response)
    if(response === "done"){
      resetImage();
      setShow(true)
      setSentTakePhoto(false)
      setShowSaveModal(false)
    }else if(response ==="file exists"){
      setShowSaveModal(false)
      setShowFileExistsModal(true)
    }
  }

  const handleValueChange = (event) =>{
    setFileName(event.target.value)
  }

  const handleConfirmOverwrite = () =>{
    overwrite(fileName, img);
    setShowFileExistsModal(false);
  }

  return (
    img && img !="false" ?
    <Container>
      <Row>
        <div>
          <h1>PICTURE TAKEN</h1>
        </div>
      </Row>
      
        <Row>
          <div id="photoTaken">
            <img id="photo" src={"data:image/jpeg;base64," + img} />
          </div>
        </Row>
        <Row>
          <Col id="buttons">
        <Button onClick={handleSavePhoto}>
          SAVE PHOTO
        </Button>
        </Col>
        <Col id="buttons">
        <Button  onClick={handleTakeNewPhoto}>
          TAKE NEW PHOTO
        </Button>
        </Col>
        <Col id="buttons"> 
        <Button onClick={handleHomeClick}>
          HOME
        </Button>
        </Col>
        </Row>

        <Modal
        show={showSaveModal}
        onHide={() => setShowSaveModal(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Save</Modal.Header>
        <Modal.Body>
          <Label> File Name</Label>
        <Input
              type="text"
              name={fileName}
              value={fileName}
              onChange={(event) => handleValueChange(event)}
            />
        </Modal.Body>
        
        <Modal.Footer>
          <Button color="success" onClick={handleConfirmSaveEdit}>
            Conferma
          </Button>
          <Button color="danger" onClick={() => setShowSaveModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showFileExistsModal}
        onHide={() => setShowFileExistsModal(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> File already exists!</Modal.Header>
        <Modal.Body>
          <Label> File with name {fileName} already exists!</Label>
          <Label> Click on confirm to overwrite or on edit to change the file name</Label>
        </Modal.Body>
        
        <Modal.Footer>
          <Button color="danger" onClick={handleConfirmOverwrite}>
            OVERWRITE
          </Button>
          <Button color="success" onClick={() => {
            setShowSaveModal(true)
            setShowFileExistsModal(false)
            }}>
            EDIT
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    : <Container>
      <Row>
          <h1 id="waitingForPhoto">Waiting for the client to take the picture...</h1>
        </Row>
    </Container>

    
  );
}

export default TakePhoto;
