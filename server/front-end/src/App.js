
import { Container, Row} from "reactstrap";
import Nav from "react-bootstrap/Nav";
import'./App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
// import "./styles.css";

function App() {
  const handleSelectComponent = (key) => {
    console.log(key)
  }

  return (
    <Container id="homePageContainer">
      <Row>
        <div>
          <h1>CT INFO TRANSFER</h1>
        </div>
      </Row>
      <Row>
        <Nav justify variant="tabs" onSelect={(selectedKey) => handleSelectComponent(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey={"CreateFlow"} >CREATE FLOW</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"UpdateFlows"} >EDIT FLOW</Nav.Link>
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

export default App;
