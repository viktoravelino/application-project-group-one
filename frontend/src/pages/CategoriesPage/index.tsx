import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { categoryCollection } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

export const CategoriesPage = () => {
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(
      categoryCollection,
      where('userId', '==', currentUser?.uid)
    );
    return onSnapshot(q, (querySnapshot) => {
      const array: any = [];
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setCategories(array);
      console.log(array);
    });
  }, []);

  const saveCategory = async () => {
    if (!categoryName) return;
    try {
      await addDoc(categoryCollection, {
        title: categoryName,
        userId: currentUser?.uid,
      });
      alert('Category Created');
      setCategoryName('');
      setShowNewCategoryModal(false);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => {
          setCategoryName('');
          setShowNewCategoryModal(true);
        }}
        className="mb-4 md:w-2/12 md:ml-auto"
      >
        New Category
      </Button>

      {categories &&
        categories.map((category: any) => {
          return <TestComp key={category.id} category={category} />;
        })}

      {/* Modal */}
      <Modal
        show={showNewCategoryModal}
        onClose={() => setShowNewCategoryModal(false)}
      >
        <div className="text-right mb-2">
          <button
            className="mr-2 p-1"
            onClick={() => setShowNewCategoryModal(false)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p>Category</p>
            <input
              className="p-2 text-black rounded-md"
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button className="ml-auto" onClick={() => saveCategory()}>
              Save Category
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const TestComp = ({
  category,
}: //   editCategory,
{
  category: any;
  //   editCategory: (category: any) => void;
}) => {
  const deleteCategory = async () => {
    try {
      await deleteDoc(doc(categoryCollection, category.id));
      alert('Category deleted!');
    } catch (error) {
      console.log(error);
      alert('Error occurred!');
    }
  };

  return (
    <div
      className="budget-card px-3 py-3 
      border-[1px] border-gray-600
    rounded-lg shadow-lg shadow-gray-800
    text-white
    flex flex-row justify-between items-center
    
    "
    >
      <p className="font-bold">{category.title}</p>

      <div className="budget-card-footer flex flex-row gap-4 justify-end">
        <Button>View</Button>
        {/* <Button onClick={() => editCategory(category)}>Edit</Button> */}
        <Button onClick={deleteCategory}>Delete</Button>
      </div>
    </div>
  );
};
