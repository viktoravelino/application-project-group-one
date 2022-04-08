import {
  addDoc,
  doc,
  onSnapshot,
  query,
  deleteDoc,
  where,
  Timestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useEffect, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { budgetsCollection, expensesCollection } from "../../config/firebase";
import { formatDateFromFirebase } from "../../lib/helpers";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


export const ExpensesPage = () => {
  const { budgetId } = useParams();
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [isPaid, setIsPaid] = useState(false);
  const [expenseDate, setExpenseDate] = useState<Timestamp>();
  const [expenseDescription, setExpenseDescription] = useState<string>("");
  const [fileUrl, setFileUrl] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    const q = query(expensesCollection, where("budgetId", "==", budgetId));
    return onSnapshot(q, (querySnapshot) => {
      const array = [] as any;
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(array);
    });
  }, []);
  const inputFile = useRef<HTMLInputElement>(null);
  const clearModalInputs = () => {
    setNewExpenseTitle("");
  };

  const openModal = async () => {
    clearModalInputs();
    setShowCreateExpenseModal(true);
  };

  const createNewExpense = async () => {
    if (!newExpenseTitle) return;
    try {
      await addDoc(expensesCollection, {
        budgetId: budgetId,
        title: newExpenseTitle,
        description: expenseDescription,
        amount: parseFloat(amount),
        isPaid: isPaid,
        date: expenseDate,
        fileUrl: fileUrl,

      });
      const budgetRef = doc(budgetsCollection, budgetId);
      await updateDoc(budgetRef, {
        totalSpent: increment(parseFloat(amount)),
      });
      alert("Expense Created");
      setNewExpenseTitle("");
      setAmount("");
      setIsPaid(false);
      setShowCreateExpenseModal(false);
      setFileUrl('');
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleFileUpload = async (e: any) => {
    const { files } = e.target;
    const filename = files[0].name;
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `ExpensePicture/${filename}`
    );
    try {
     
      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, files[0]);
      //download file
      const url = await getDownloadURL(
        ref(storage, `ExpensePicture/${filename}`)
      );
      setFileUrl(url);
      setPicture(url);
    } catch (error: any) {
      console.error(error.message);
      alert("An error occurred");
    }
  };

  const onButtonClick = () => {
    inputFile?.current?.click();
  };



  return (
    <div className="flex flex-col gap-3">
      <Button onClick={openModal} className="mb-4 md:w-2/12 md:ml-auto">
        New Expense
      </Button>
      {expenses.map((expense: any) => (
        <ExpenseCard key={expense.id} expense={expense} />
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
            <p>Create new Expense</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Expense Title"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
            />
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Expense Description"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />

            <input
              className="p-2 text-black rounded-md"
              type="number"
              placeholder="Expense Amount"
              step={0.01}
              value={amount}
              onChange={(e) => setAmount(e.target.value || "")}
            />
            <input
              className="p-2 text-black rounded-md"
              type="date"
              name="date"
              id="date"
              onChange={(e) => {
                setExpenseDate(
                  Timestamp.fromDate(new Date(`${e.target.value} 00:00`))
                );
              }}
            />
            <img
            className="profile-picture border-2 w-36 h-36 mb-10"
            src={picture!}
          />
            <Button >
              <input
                style={{ display: "none" }}
                accept=".png,.jpg"
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
              />
              <div className="button" onClick={onButtonClick}>
                Upload
              </div>
            </Button>

            {/*<input type="file" onChange={onFileChange} />*/}

            <label>Is Paid?</label>
            <input
              className="p-10 "
              name="Is Paid?"
              type="checkbox"
              onChange={() => setIsPaid(true)}
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

const ExpenseCard = ({ expense }: any) => {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  // const [isPaidState, setIsPaidState] = useState(expense.isPaid);

  const changePaidStatus = async () => {
    const docRef = doc(expensesCollection, expense.id);
    try {
      await updateDoc(docRef, {
        isPaid: !expense.isPaid,
      });
    } catch (error: any) {
      alert(error.message);
      console.error(error.message);
    }
  };

  async function deleteExpense() {
    try {
      const budgetRef = doc(budgetsCollection, budgetId);
      await updateDoc(budgetRef, {
        totalSpent: increment(-parseFloat(expense.amount)),
      });
      await deleteDoc(doc(expensesCollection, expense.id));
    } catch (error: any) {
      alert(error.message);
      console.log(error.message);
    }
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
        <h3 className="text-lg font-bold">{expense.title}</h3>
      </div>
      <div className="body">
        <p className="text-lg">Description: {expense.description}</p>
        <p className="text-lg">Amount: $ {expense.amount.toFixed(2)}</p>
        
        <img className="profile-picture border-2 w-40 h-40 mb-10"
          src= {expense.fileUrl}/>
          
        <p>Date: {formatDateFromFirebase(expense.date)}</p>

        <p className="text-lg">
          Paid:{" "}
          <input
            type="checkbox"
            onChange={changePaidStatus}
            checked={expense.isPaid}
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
        <Button onClick={() => deleteExpense()}>Delete Expenses</Button>
      </div>
    </div>
  );
};
