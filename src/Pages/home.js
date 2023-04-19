import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

function Home() {
  return (
    <div>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Recipies</Card.Title>
            <Card.Text>place where recipies all show up</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
