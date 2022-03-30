import {
    addDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    deleteDoc,
    where,
    Timestamp,
  } from "firebase/firestore";

import {useState, useEffect } from 'react'
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import {  expensesCollection, wishlistCollection } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export const WishList = () => {
  const { currentUser } = useAuth();
  const [showCreateWishModal, setShowCreateWishModal] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [wishlistName, setWishlistName] = useState("");
  const [wishlistPrice, setWishlistPrice] = useState("");

    
  const openModal = () => {
    setShowCreateWishModal(true);
  }  



  const createNewWish = async () => {
    if(!wishlistName) return;
    try{
        await addDoc(wishlistCollection, {
            title: wishlistName,
            price: parseFloat(wishlistPrice),
            userID : [currentUser?.uid]
        });
        alert(`expense created`);
        //hide modal
        setShowCreateWishModal(false);
        //clear inputs
        setWishlistPrice("");
        setWishlistName(""); 
    } catch (e :any) {
        alert(e.message);
    }
  }

  useEffect(() => {
    const q = query(wishlistCollection);
    return onSnapshot(q, (querySnapshot) => {
        const array = [] as any;
        querySnapshot.forEach((doc) => {
          array.push({ id: doc.id, ...doc.data() });
        });
        setWishlist(array);
      });
  },[])


  return (
    <div className="flex flex-col gap-3">
  
        <Button onClick={openModal} className="mb-4 md:w-2/12 md:ml-auto">New wishlist item</Button>

        {wishlist.map((wishlist: any) => (
        <WishlistCard key={wishlist.id} wishlist={wishlist} />
      ))}
        {/* wishlist modal*/}
        <Modal show={showCreateWishModal}>
        <div className="text-right mb-2">
          <button
            className="mr-2 p-1"
            onClick={() => setShowCreateWishModal(false)}
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p>Name of Wishlist:</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Name"
              value={wishlistName}
              onChange={(e) => setWishlistName(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <p>Price of Wishlist:</p>
            <input
              className="p-2 text-black rounded-md"
              type="number"
              placeholder="Price"
              value={wishlistPrice}
              onChange={(e) => setWishlistPrice(e.target.value)} 
            />

            <Button className="ml-auto" onClick={createNewWish}>
              Create Wishlist
            </Button>
          </div>
        </div>
      </Modal>

      
    </div>
  )
}


const WishlistCard = ({ wishlist }: any) => {

    const [isPaid, setIsPaid] = useState(false);
    const [expenseDate, setExpenseDate] = useState<Timestamp>();
    const [expenseDescription, setExpenseDescription] = useState<string>("");
    const [expenseCategory, setExpenseCategory] = useState<string>("");
    const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
    const [wishlistName, setWishlistName] = useState(wishlist.title);
    const [wishlistPrice, setWishlistPrice] = useState(wishlist.price);

    const openExpenseModal = () => {
        setShowCreateExpenseModal(true)
      }

    const deleteWishlist = async (wishTitle: string) => {
        try{
            deleteDoc(doc(wishlistCollection));
            const q = query(wishlistCollection, where("title", "==", wishTitle));
            const snap = await getDocs(q);
            snap.forEach(
              async (docInfo) => await deleteDoc(doc(wishlistCollection, docInfo.id))
            );
            alert(`wishlist delete`);
        }catch(err) {
            alert(err);
        }
       
    }

    const createExpense = async () => {
        if (!wishlist.title) return;
        try {
          await addDoc(expensesCollection, {
            title: wishlist.title,
            description: expenseDescription,
            category: expenseCategory,
            amount: parseFloat(wishlist.price),
            isPaid: isPaid,
            date: expenseDate,
          });
          alert("Expense Created");
          setWishlistName("");
          setWishlistPrice("");
          setExpenseCategory("");
          setIsPaid(false);
          setShowCreateExpenseModal(false);
        } catch (error: any) {
          alert(error.message);
          console.log(error);
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
          <h3 className="text-lg font-bold">{wishlist.title}</h3>
        </div>
        <div className="body">
          <p className="text-lg">Price: {wishlist.price}$</p>
        </div>
  
        <div className="budget-card-footer flex flex-row gap-4 justify-end">
          <Button
            onClick={() => deleteWishlist(wishlist.title)}
          >
            Delete
          </Button>
          <Button onClick={openExpenseModal}> 
            Create as an Expenses
          </Button>
        </div>

         {/* expense modal*/}
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
              value={wishlistName}
              onChange={(e) => setWishlistName(e.target.value)}
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
              type="text"
              placeholder="Expense Category"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            />


            <input
              className="p-2 text-black rounded-md"
              type="number"
              placeholder="Expense Amount"
              step={0.01}
              value={wishlistPrice}
              onChange={(e) => setWishlistPrice(e.target.value || "")}
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

            <label>Is Paid?</label>
            <input
              className="p-10 "
              name="Is Paid?"
              type="checkbox"
              onChange={() => setIsPaid(true)}
            />

            <Button className="ml-auto" onClick={createExpense}>
              Create Expense
            </Button>
          </div>
        </div>
      </Modal>
      </div>

      
    );
  };