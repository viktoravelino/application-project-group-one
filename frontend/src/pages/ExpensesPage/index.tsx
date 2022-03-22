import {
  addDoc,
  doc,
  onSnapshot,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { expensesCollection } from "../../config/firebase";

export const ExpensesPage = () => {
  const { budgetId } = useParams();
  console.log(budgetId);
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const q = query(expensesCollection, where("budgetId", "==", budgetId));
    return onSnapshot(q, (querySnapshot) => {
      const array = [] as any;
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(array);
    });
  }, []);

  const clearModalInputs = () => {
    setNewExpenseTitle("");
  };

  const openModal = async () => {
    clearModalInputs();
    setShowCreateExpenseModal(true);
  };

  const createNewExpense = async () => {
    if (!newExpenseTitle) return;
    try {
      await addDoc(expensesCollection, {
        budgetId: budgetId,
        title: newExpenseTitle,
        // TODO: parse into float number before saving
        amount: amount,
        isPaid: isPaid,
        // TODO: LATER - change by the inputs value
        // date: Date.now(),
      });
      alert("Expense Created");
      setNewExpenseTitle("");
      setAmount("");
      setIsPaid(false);
      setShowCreateExpenseModal(false);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={openModal} className="mb-4 md:w-2/12 md:ml-auto">
        New Expense
      </Button>
      {expenses.map((expense: any) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}

      <Modal show={showCreateExpenseModal}>
        <div className="text-right mb-2">
          <button
            className="mr-2 p-1"
            onClick={() => setShowCreateExpenseModal(false)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p>Create new Expense</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Expense Title"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
            />
            {/* TODO: input should be number formatted with .00 2 decimals */}
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* TODO: LATER - input for a date */}

            <label>Is Paid?</label>
            <input
              className="p-10 "
              name="Is Paid?"
              type="checkbox"
              onChange={() => setIsPaid(true)}
            />

            <Button className="ml-auto" onClick={createNewExpense}>
              Create Expense
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// interface BudgetCardProps {}

const ExpenseCard = ({ expense }: any) => {
  const { budgetId } = useParams();
  const navigate = useNavigate();

  async function deleteExpense() {
    await deleteDoc(doc(expensesCollection, expense.id));
  }
  return (
    <div
      className="budget-card px-3 py-3 
      border-[1px] border-gray-600
    rounded-lg shadow-lg shadow-gray-800
    text-white
    flex flex-col gap-5
    
    "
    >
      <div className="budget-card-header flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">{expense.title}</h3>
      </div>

      <div className="budget-card-header flex flex-row justify-between items-center">
        {/* TODO: Format the number before showing on the screen ie. $ 123.00 */}
        <h3 className="text-lg font-bold">{expense.amount}</h3>
      </div>
      <div className="budget-card-header flex flex-row justify-between items-center">
        {/* TODO: This is not being shown on the card - you can use a checkbox or an icon */}
        {/* ie: {isPaid ? <PaidIcon /> : <NotPaidIcon />} */}
        <h3 className="text-lg font-bold">{expense.isPaid}</h3>
      </div>

      <div className="budget-card-footer flex flex-row gap-4 justify-end">
        <Button
          onClick={() =>
            navigate(`/budgets/${budgetId}/expenses/${expense.id}`)
          }
        >
          Edit Expenses
        </Button>
        <Button onClick={() => deleteExpense()}>Delete Expenses</Button>
      </div>
    </div>
  );
};
