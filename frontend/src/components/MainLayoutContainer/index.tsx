import { BiUserCircle, BiListUl } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiPayMoney } from 'react-icons/gi';
import { BsListNested } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { SideMenu, SideMenuItem } from '../SideMenu';

export const MainLayoutContainer = (): JSX.Element => {
  return (
    <div className="main-layout-container">
      <Header />
      <main className="flex flex-col md:flex-row md:pt-16 min-h-screen pb-20 md:pb-0">
        <SideMenu>
          <SideMenuItem
            text="Dashboard"
            to="dashboard"
            Icon={MdOutlineDashboard}
          />
          <SideMenuItem text="Budgets" to="budgets" Icon={FaRegClipboard} />
          <SideMenuItem text="Categories" to="categories" Icon={BsListNested} />
          <SideMenuItem text="Expenses" to="allExpenses" Icon={GiPayMoney} />
          <SideMenuItem text="Wishlist" to="wishlist" Icon={BiListUl} />
          <SideMenuItem
            className="md:hidden"
            text="Profile"
            to="user-profile"
            Icon={BiUserCircle}
          />
          {/* <SideMenuItem text="Transactions" to="transactions" Icon={GiReceiveMoney} /> */}
        </SideMenu>
        <section className="main-content-container w-full bg-gray-700 mt-12 md:mt-0 flex-1 p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
