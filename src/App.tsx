import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { SideBar } from "./ui/SideBar";

export function App() {
  return (
    <>
      <SideBar />
      <Header />
      <Outlet />
    </>
  );
}
