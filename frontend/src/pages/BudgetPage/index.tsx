import { useParams } from "react-router-dom";

export const BudgetPage = () => {
  const test = useParams();
  console.log(test);
  return <div>BudgetPage</div>;
};
