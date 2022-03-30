import "./App.css";
import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalId, setViewExpensesModalId] = useState();
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
          <TotalBudgetCard />

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
                onViewExpensesClick={() => setViewExpensesModalId(budget.id)}
              />
            );
          })}

          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalId(UNCATEGORIZED_BUDGET_ID)
            }
          />
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

      <ViewExpensesModal
        budgetId={viewExpensesModalId}
        handleClose={() => setViewExpensesModalId()}
      />
    </>
  );
}

export default App;
