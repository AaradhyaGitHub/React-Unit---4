import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
export default function RootLayout() {
  return (
    <>
      <MainNavigation /> {/* Always visible */}
      <main>
        <Outlet />
        {/* Defines where the content of the child routes should be rendered  */}
      </main>
    </>
  );
}
