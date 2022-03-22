import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { expensesCollection } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export const ExpensesPage = () => {
  const { budgetId } = useParams();
  console.log(budgetId);
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [insertExpenseID, setInsertExpenseID] = useState("");
  console.log(expenses);
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
    setInsertExpenseID("");
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
        // TODO: change by the inputs value
        amount: 123,
        // TODO: change by the inputs value
        isPaid: false,
        // TODO: change by the inputs value
        // date: Date.now(),
      });
      alert("Expense Created");
      setNewExpenseTitle("");
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
            {/* TODO: input for the amount */}
            {/* TODO: input for a date */}
            {/* TODO: input for check if it is paid or not (checkbox or select) */}
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
  const navigate = useNavigate();
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
        <h3 className="text-lg font-bold">{expense.title || "not found"}</h3>
      </div>
      {/* TODO: Create a body showing the amount, date and isPaid */}

      {/* TODO: Delete progressive bar */}
      <div className="budget-card-progressive-bar flex flex-col items-center gap-2">
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-800">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "45%" }}
          ></div>
        </div>
        <span>$123.00 / $123.00</span>
      </div>
      <div className="budget-card-footer flex flex-row gap-4 justify-end">
        <Button onClick={() => navigate(`/budgets/${expense.id}`)}>
          Edit Expenses
        </Button>
      </div>
    </div>
  );
};
