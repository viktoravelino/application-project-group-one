import { BsListNested } from "react-icons/bs";
import { FaRegClipboard } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { Header } from "../../components/Header";
import { SideMenu, SideMenuItem } from "../../components/SideMenu";

export const MainLayoutContainer = (): JSX.Element => {
  return (
    <div className="main-layout-container">
      <Header />
      <main className="flex flex-col md:flex-row md:mt-16">
        <SideMenu>
          <SideMenuItem text="Dashboard" to="#" Icon={MdOutlineDashboard} />
          <SideMenuItem text="Budgets" to="#" Icon={FaRegClipboard} />
          <SideMenuItem text="Categories" to="#" Icon={BsListNested} />
          <SideMenuItem text="Transactions" to="#" Icon={GiReceiveMoney} />
        </SideMenu>
        <section className="main-content-container bg-gray-700 w-full h-screen mt-12 md:mt-0">
          Main Content container
        </section>
      </main>
    </div>
  );
};
