import { onSnapshot, query, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { expensesCollection } from '../../config/firebase';
import { formatDateFromFirebase } from '../../lib/helpers';
import { Button } from '../../components/Button';

interface Expense {
  id: string;
  title: string;
  description: string;
  category: string;
  amount: number;
  date: Timestamp;
  readonly isPaid: boolean;
}

export const AllExpenses = () => {
  //will store all the expenses in an array
  const [expenses, setExpenses] = useState<Expense[]>([]);
  //retrieve all expenses from that user account
  useEffect(() => {
    console.log('mounting');
    const q = query(expensesCollection);
    return onSnapshot(q, (querySnapshot) => {
      const array = [] as any;
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(array);
    });
  }, []);

  //display it to user
  if (!expenses) return null;

  const navigate = useNavigate();
  const { budgetId } = useParams();

  return (
    <div>
      {expenses.map((expense: Expense) => {
        console.log(expense.date);
        return (
          <div
            key={expense.id}
            className="budget-card px-3 py-3
              border-[1px] border-gray-600
            rounded-lg shadow-lg shadow-gray-800
            text-white
            flex flex-col gap-1"
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
                Paid:{' '}
                <input
                  type="checkbox"
                  checked={expense.isPaid}
                  readOnly={true}
                />
              </p>
            </div>

            <div className="budget-card-footer flex flex-row gap-4 justify-end">
              <Button
                onClick={() =>
                  navigate(`/budgets/${budgetId}/expenses/${expense.id}`)
                }
              >
                Edit Expenses
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
