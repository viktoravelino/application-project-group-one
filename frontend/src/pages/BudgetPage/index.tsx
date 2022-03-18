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
    flex flex-col gap-5
    
    "
    >
      <div className="budget-card-header flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold"> Current Title 
        <input placeholder={budget.title}></input></h3>
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
      <Button onClick={() => navigate(`/budgets/${budget.id}`)}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};