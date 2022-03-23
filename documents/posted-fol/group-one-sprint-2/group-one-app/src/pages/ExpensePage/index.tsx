//firebase database functions
import {
  doc,
  getDoc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

//collection of budgets
import { budgetsCollection, expensesCollection } from "../../config/firebase";
//react router
import { useNavigate, useParams } from "react-router-dom";
//button component
import { Button } from "../../components/Button";
//authentication firebase
//import react
import { useState, useEffect } from "react";
import { formatDateFromFirebaseForInput } from "../../lib/helpers";

export const ExpensePage = () => {
  const { expenseId } = useParams();

  //useState will hold users budgets
  const [expense, setExpense] = useState<any>(null);

  useEffect(() => {
    async function execute() {
      const docRef = doc(expensesCollection, expenseId);
      const docInfo = await getDoc(docRef);
      setExpense({ id: docInfo.id, ...docInfo.data() });
    }
    execute();
  }, []);

  if (!expense) return null;

  return (
    <div className="flex flex-col gap-3">
      <ExpenseCard key={expense.id} expense={expense} />
    </div>
  );
};

const ExpenseCard = ({ expense }: any) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount || 0);
  const [description, setDescription] = useState(expense.description);
  const [isPaid, setIsPaid] = useState(expense.isPaid);
  const [date, setDate] = useState(expense.date);

  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    const docRef = doc(expensesCollection, expense.id);
    try {
      await updateDoc(docRef, {
        title,
        amount: parseFloat(amount),
        date,
        description,
        isPaid,
      });
      const budgetRef = doc(budgetsCollection, expense.budgetId);
      await updateDoc(budgetRef, {
        totalSpent: increment(parseFloat(amount) - parseFloat(expense.amount)),
      });
      alert("Expense Updated");
      navigate(-1);
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
        <h3 className="text-lg font-bold"> Edit {expense.title} </h3>
      </div>

      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="py-3">
            <label className="form-label inline-block mb-2 text-lg font-bold">
              Expense Name
            </label>
            <input
              type="text"
              className="text-black form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              placeholder="Expense Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="py-3">
            <label className="form-label inline-block mb-2 text-lg font-bold">
              Expense Amount ($)
            </label>
            <input
              type="number"
              className=" text-black form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              placeholder="Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="py-3">
            <label className="form-label inline-block mb-2 text-lg font-bold">
              Expense Description
            </label>
            <input
              type="text"
              className=" text-black form-control block w-full px-3 py-1.5 text-base rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
              focus:border-green-500 focus:outline-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="py-3">
            <label className="form-label inline-block mb-2 text-lg font-bold">
              Paid:
            </label>
            <br />
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.value)}
            />
          </div>

          <div className="py-3">
            <label className="form-label inline-block mb-2 text-lg font-bold">
              Date:
            </label>
            <br />
            <input
              className="text-black"
              type="date"
              value={formatDateFromFirebaseForInput(date)}
              onChange={(e) =>
                setDate(Timestamp.fromDate(new Date(`${e.target.value} 00:00`)))
              }
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
