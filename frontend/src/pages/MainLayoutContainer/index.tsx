import { BsListNested } from "react-icons/bs";
import { FaRegClipboard } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { SideMenu, SideMenuItem } from "../../components/SideMenu";

export const MainLayoutContainer = (): JSX.Element => {
  return (
    <div className="main-layout-container">
      <header>header</header>
      <main
        className="
      flex flex-col
      md:flex-row
      "
      >
        <SideMenu>
          <SideMenuItem text="Dashboard" to="#" Icon={MdOutlineDashboard} />
          <SideMenuItem text="Budgets" to="#" Icon={FaRegClipboard} />
          <SideMenuItem text="Categories" to="#" Icon={BsListNested} />
          <SideMenuItem text="Transactions" to="#" Icon={GiReceiveMoney} />
        </SideMenu>
        <section className="main-content-container">
          Main Content container
        </section>
      </main>
    </div>
  );
};
