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

import {useState} from 'react'
import {json2csv, json2csvAsync } from 'json-2-csv';
import { budgetsCollection, expensesCollection } from "../../../config/firebase";
import { Button } from "../../../components/Button/index";
import { useAuth } from "../../../context/AuthContext";

interface Budgets {
    goalAmount : string;
    id: string;
    title: string;
    totalSpent: number;
    users: any
}

export const ExportBudget = () => {
    //current user 
    const { currentUser } = useAuth();
    const [budgets, setBudgets] = useState<any[]>([]);
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
            setBudgets(test);
            
          });
          
                json2csvAsync(budgets)
                .then((csv) => {
                    console.log(`${csv} \n `)
                    let csvContent = "data:text/csv;charset=utf-8" + csv
                    let encodedUri  : any = encodeURI(csvContent);
                    window.open(encodedUri);
                })
                .catch((err) => { err.message });


            
   

        
  
          
    }
    
  return (
        <Button className="mb-4 md:w-2/12 md:ml-auto" onClick={exportBudgets}>
            Export Budget
        </Button>

  )
}
