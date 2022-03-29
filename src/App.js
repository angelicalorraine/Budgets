import "./App.css";
import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { useState } from "react";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setaddExpenseModalBudgetId] = useState();
  const { budgets, expenses, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setaddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto"> Budgets </h1>
          <Button
            variant="info"
            onClick={() => setShowAddBudgetModal(true)}
            style={{ color: "white" }}
          >
            Add Budget
          </Button>
          <Button variant="outline-info" onClick={openAddExpenseModal}>
            Add Expense
          </Button>{" "}
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
        </div>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  );
}

export default App;
