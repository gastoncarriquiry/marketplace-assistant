import { Outlet } from "react-router-dom";
import TabBar from "../TabBar/TabBar";
import "./UI.css";

const UI = () => {
  return (
    <>
      <main className="content">
        <Outlet />
      </main>
      <TabBar />
    </>
  );
};

export default UI;
