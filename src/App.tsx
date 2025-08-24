import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import ShopNow from "./components/ShopNow";

export default function App() {
  return (
    <div>
      <Nav />
      <Outlet />
      <ShopNow />
    </div>
  );
}
