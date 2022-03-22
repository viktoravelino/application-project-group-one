import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { budgetsCollection } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export const BudgetsPage = () => {
  const [showCreateBudgetModal, setShowCreateBudgetModal] = useState(false);
  const { currentUser } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [newBudgetTitle, setNewBudgetTitle] = useState("");
  const [insertBudgetID, setInsertBudgetID] = useState("");

  useEffect(() => {
   
      const q = query(
        budgetsCollection, where("users", "array-contains", currentUser?.uid)
      );
      return onSnapshot(q, (querySnapshot) => {
     
      const test: any = [];
      querySnapshot.forEach((doc) => {
        test.push({ id: doc.id, ...doc.data() });
      });
      setBudgets(test);
    });
  
  }, []);

  const clearModalInputs = () => {
    setNewBudgetTitle("");
    setInsertBudgetID("");
  };

  const openModal = async () => {
    clearModalInputs();
    setShowCreateBudgetModal(true);
  };

  const createNewBudget = async () => {
    if (!newBudgetTitle) return;
    try {
      await addDoc(budgetsCollection, {
        title: newBudgetTitle,
        goalAmount: 0,
        users: [currentUser?.uid],
      });
      alert("Budget Created");
      setNewBudgetTitle("");
      setShowCreateBudgetModal(false);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  const insertExistingBudget = async () => {
    if (!insertBudgetID) return;
    const docRef = doc(budgetsCollection, insertBudgetID);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert("This budget does not exist!");
        return;
      }

      const docData = docSnap.data();
      if (docData.users.includes(currentUser!.uid)) {
        alert("You already have this budget");
        return;
      }
      await updateDoc(docRef, {
        users: [...docData.users, currentUser!.uid],
      });
      alert("Budgets inserted into your account");
      setInsertBudgetID("");
      setShowCreateBudgetModal(false);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={openModal} className="mb-4 md:w-2/12 md:ml-auto">
        New Budget
      </Button>
      {budgets.map((budget: any) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}

      <Modal show={showCreateBudgetModal}>
        <div className="text-right mb-2">
          <button
            className="mr-2 p-1"
            onClick={() => setShowCreateBudgetModal(false)}
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
              placeholder="Existing budget ID"
              value={insertBudgetID}
              onChange={(e) => setInsertBudgetID(e.target.value)}
            />
            <Button className="ml-auto" onClick={insertExistingBudget}>
              Insert Budget
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <p>Create new Budget</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Budget Title"
              value={newBudgetTitle}
              onChange={(e) => setNewBudgetTitle(e.target.value)}
            />
            <Button className="ml-auto" onClick={createNewBudget}>
              Create Budget
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// interface BudgetCardProps {}

const BudgetCard = ({ budget }: any) => {
  const navigate = useNavigate();

  async function deleteBudget() {
    await deleteDoc(doc(budgetsCollection, budget.id));
    
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
        <h3 className="text-lg font-bold">{budget.title}</h3>
        <div className="people-shared flex flex-row gap-1">
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <button
            onClick={() => alert(`Share using this ID: ${budget.id}`)}
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
        <Button onClick={() => navigate(`/budgets/${budget.id}/expenses`)}>
          View Expenses
        </Button>
        <Button
          onClick={() => navigate(`/budgets/${budget.id}`, { state: budget })}
        >
          Edit Budget
        </Button>

        <Button onClick={() => deleteBudget()}>
          Delete Budget
        </Button>
      </div>
    </div>
  );
};
