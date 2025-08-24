import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import ShopNow from "./components/ShopNow";
import SkillLinkCard from "./components/SkillLinkCard";

export default function App() {
  return (
    <div>
      <Nav />
      <Outlet />
      <ShopNow />
      <SkillLinkCard />
    </div>
  );
}
