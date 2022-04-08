import {
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";

import { json2csvAsync } from 'json-2-csv';
import { budgetsCollection } from "../../../config/firebase";
import { Button } from "../../../components/Button/index";
import { useAuth } from "../../../context/AuthContext";

interface obj {
  id: string,
  title: string,
  goalAmount : string,
  totalSpent : string,
}

export const ExportBudget = () => {
    //current user 
    const { currentUser } = useAuth();
    //first step is to get budget data from firebase
    //convert data  
    //turn it in a csv file 

    const exportBudgets = () => {
        const q = query(
            budgetsCollection,
            where("users", "array-contains", currentUser?.uid)
          );
            onSnapshot(q, (querySnapshot) => {
            const test: any = [];
            querySnapshot.forEach((doc) => {

              test.push({ id: doc.id, ...doc.data() });
            });
            let array : any = []
            test.map((budget : obj) => {
             
              const obj =  {
                  id: budget.id,
                  title: budget.title,
                  goalAmount : budget.goalAmount,
                  totalSpent : budget.totalSpent,
              }
              
              array.push(obj);
            })
          json2csvAsync(array)
            .then((csv) => {
                const file = new Blob([csv],{type:"text/csv"})
                const test = window.URL.createObjectURL(file)
                console.log(file)
                window.open(test);
            })
            .catch((err) => { err.message });
          });
          


    }
    
  return (
        <Button className="mb-4 md:w-2/12 md:ml-auto" onClick={exportBudgets}>
            Export Budget
        </Button>

  )
}
