import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export const BudgetsPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Button className="mb-4 md:w-2/12 md:ml-auto">New Budget</Button>
      <BudgetCard />
      <BudgetCard />
      <BudgetCard />
      <BudgetCard />
    </div>
  );
};

const BudgetCard = () => {
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
        <h3 className="text-lg font-bold">Budget Title</h3>
        <div className="people-shared flex flex-row gap-1">
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <div className="h-8 w-8 border-2 rounded-full"></div>
          <div className="h-8 w-8 border-2 rounded-full"></div>
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
        <Button onClick={() => navigate("/budgets/123/categories")}>
          View Categories
        </Button>
        <Button onClick={() => navigate("/budgets/123")}>Edit Budget</Button>
      </div>
    </div>
  );
};
