import "./App.css";
import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto"> Budgets </h1>
        <Button variant="info" style={{ color: "white" }}>
          Add Budget{" "}
        </Button>
        <Button variant="outline-info">Add Expense</Button>{" "}
      </Stack>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <BudgetCard
          name="Entertainment"
          gray
          amount={900}
          max={1000}
        ></BudgetCard>
      </div>
    </Container>
  );
}

export default App;
