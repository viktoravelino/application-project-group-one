//firebase database functions
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

//collection of budgets
import { budgetsCollection } from "../../config/firebase";
//navigate
import { useLocation, useNavigate } from "react-router-dom";
//react router
import { useParams } from "react-router-dom";
//button component
import { Button } from "../../components/Button";
//authentication firebase
import { useAuth } from "../../context/AuthContext";
//import react 
import {useState,useEffect} from 'react';

export const  BudgetPage = () => {

  let { state } = useLocation();
 
  //get current user by using authentication
  const { currentUser } = useAuth();
  //useState will hold users budgets
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    async function execute() {
      const q = query(
        budgetsCollection,
        where("users", "array-contains", currentUser?.uid)
      );
      const querySnap = await getDocs(q);
      const test: any = [];
      
      querySnap.forEach((doc) => {
        if(state.id === doc.id){
          test.push({ id: doc.id, ...doc.data() });
        }else{
          return;
        }
      });

      setBudgets(test);
   
    }
    execute();
    
  }, []);
  

  return (
    <div className="flex flex-col gap-3">
    <p>Edit Page</p>
    
    {budgets.map((budget: any) => (
      <BudgetCard key={budget.id} budget={budget} />
    ))}

  </div>
  );
};

const BudgetCard = ({ budget }: any) => {
  const navigate = useNavigate();
  return (
    <div
      className="budget-card px-3 py-3 
      border-[1px] border-gray-600
      rounded-lg shadow-lg shadow-gray-800
    text-white
      flex flex-col gap-5"
    >
      <div className="budget-card-header flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold"> Edit {budget.name} </h3>
      </div>

      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="py-3">
            <label htmlFor="BudgetNameInput" className="form-label inline-block mb-2 text-lg font-bold">
              Budget Name
            </label>
            <input type="text"
              className="form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              id="BudgetNameInput"
              placeholder="Budget Name"
            />
          </div>
          
          <div className="py-3">
            <label htmlFor="BudgetDescInput" className="form-label inline-block mb-2 text-lg font-bold">
              Budget Description
            </label>
            <textarea
              className=" form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              id="BudgetDescInput"
              rows={3}
              placeholder="Budget Description"
            ></textarea>
          </div>
  
          <div className="py-3">
            <label htmlFor="BudgetGoalInput" className="form-label inline-block mb-2 text-lg font-bold">
              Budget Goal Amount ($)
            </label>
            <input type="number"
              className="form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              id="BudgetGoalInput"
              placeholder="Budget Goal"
            />
          </div>
        </div>
      </div>
     
      <div className="budget-card-footer flex flex-row gap-4 justify-end">
      <Button onClick={() => navigate(`/budgets/${budget.id}`)}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};