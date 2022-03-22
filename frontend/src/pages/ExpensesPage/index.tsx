import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { expensesCollection } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export const ExpensesPage = () => {
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [insertExpenseID, setInsertExpenseID] = useState("");

  useEffect(() => {
    async function execute() {
      const q = query(
        expensesCollection,
        where("users", "array-contains", currentUser?.uid)
      );
      const querySnap = await getDocs(q);
      const test: any = [];
      querySnap.forEach((doc) => {
        test.push({ id: doc.id, ...doc.data() });
      });

      setExpenses(test);
    }
    execute();
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
        title: newExpenseTitle,
        users: [currentUser?.uid],
      });
      alert("Expense Created");
      setNewExpenseTitle("");
      setShowCreateExpenseModal(false);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  const insertExistingExpense = async () => {
    if (!insertExpenseID) return;
    const docRef = doc(expensesCollection, insertExpenseID);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert("This Expense does not exist!");
        return;
      }

      const docData = docSnap.data();
      if (docData.users.includes(currentUser!.uid)) {
        alert("You already have this Expense");
        return;
      }
      await updateDoc(docRef, {
        users: [...docData.users, currentUser!.uid],
      });
      alert("Expense inserted into your account");
      setInsertExpenseID("");
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
      {expenses.map((budget: any) => (
        <BudgetCard key={budget.id} budget={budget} />
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
            <p>Invited to a Budget? Insert its ID bellow:</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Existing Expense ID"
              value={insertExpenseID}
              onChange={(e) => setInsertExpenseID(e.target.value)}
            />
            <Button className="ml-auto" onClick={insertExistingExpense}>
              Insert Expense
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <p>Create new Expense</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Expense Title"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
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

const ExpensCard = ({ expense }: any) => {
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
        <h3 className="text-lg font-bold">{expense.title}</h3>
        <div className="people-shared flex flex-row gap-1">
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <button
            onClick={() => alert(`Share using this ID: ${expense.id}`)}
            className="h-8 w-8 border-0 rounded-full flex justify-center items-center 
             hover:bg-white hover:bg-opacity-50"
          >
            +
          </button>
        </div>
      </div>
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
