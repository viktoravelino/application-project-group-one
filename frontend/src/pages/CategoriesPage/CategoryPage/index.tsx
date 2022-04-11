import { doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  categoryCollection,
  expensesCollection,
} from '../../../config/firebase';
import { formatDateFromFirebase } from '../../../lib/helpers';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [catName, setCatName] = useState('');
  useEffect(() => {
    const q = query(expensesCollection, where('category', '==', categoryId));
    return onSnapshot(q, (querySnapshot) => {
      const array: any = [];
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(array);
    });
  }, []);

  useEffect(() => {
    const docRef = doc(categoryCollection, categoryId);
    getDoc(docRef).then((doc) => {
      setCatName(doc.data()!.title);
    });
  }, []);

  return (
    <div>
      {expenses &&
        expenses.map((expense: any) => {
          return (
            <ExpenseCard
              key={expense.id}
              expense={{ ...expense, category: catName }}
            />
          );
        })}
    </div>
  );
};

const ExpenseCard = ({ expense }: any) => {
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
      <div className="body">
        <p className="text-lg">Description: {expense.description}</p>
        <p className="text-lg">Category: {expense.category}</p>
        <p className="text-lg">Amount: $ {expense.amount.toFixed(2)}</p>

        <p>Date: {formatDateFromFirebase(expense.date)}</p>

        <p className="text-lg">
          Paid: <input disabled type="checkbox" checked={expense.isPaid} />
        </p>
      </div>
    </div>
  );
};
