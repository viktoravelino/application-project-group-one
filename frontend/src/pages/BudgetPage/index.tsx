//firebase database functions
import { doc, getDoc, updateDoc } from "firebase/firestore";

//collection of budgets
import { budgetsCollection } from "../../config/firebase";
//navigate
import { useNavigate } from "react-router-dom";
//react router
import { useParams } from "react-router-dom";
//button component
import { Button } from "../../components/Button";
//authentication firebase
//import react
import { useState, useEffect } from "react";

export const BudgetPage = () => {
  const { budgetId } = useParams();

  //useState will hold users budgets
  const [budget, setBudget] = useState<any>(null);

  useEffect(() => {
    async function execute() {
      const docRef = doc(budgetsCollection, budgetId);
      const docInfo = await getDoc(docRef);
      setBudget({ id: docInfo.id, ...docInfo.data() });
    }
    execute();
  }, []);

  if (!budget) return null;

  return (
    <div className="flex flex-col gap-3">
      <BudgetCard key={budget.id} budget={budget} />
    </div>
  );
};

const BudgetCard = ({ budget }: any) => {
  const [title, setTitle] = useState(budget.title);
  const [goalAmount, setGoalAmount] = useState(budget.goalAmount || 0);

  const handleSaveChanges = async () => {
    const docRef = doc(budgetsCollection, budget.id);
    try {
      await updateDoc(docRef, {
        title,
        goalAmount,
      });
      alert("Budget Updated");
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div
      className="budget-card px-3 py-3 
      border-[1px] border-gray-600
      rounded-lg shadow-lg shadow-gray-800
    text-white
      flex flex-col gap-5"
    >
      <div className="budget-card-header flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold"> Edit {budget.title} </h3>
      </div>

      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="py-3">
            <label
              htmlFor="BudgetNameInput"
              className="form-label inline-block mb-2 text-lg font-bold"
            >
              Budget Name
            </label>
            <input
              type="text"
              className="text-black form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              id="BudgetNameInput"
              placeholder="Budget Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="py-3">
            <label
              htmlFor="BudgetGoalInput"
              className="form-label inline-block mb-2 text-lg font-bold"
            >
              Budget Goal Amount ($)
            </label>
            <input
              type="number"
              className=" text-black form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              id="BudgetGoalInput"
              placeholder="Budget Goal"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="budget-card-footer flex flex-row gap-4 justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
};
