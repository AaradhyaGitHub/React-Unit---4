import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation"
 export default function RootLayout() {
    return (
      <>
        <MainNavigation /> {/* Always visible */}
        <main>
          <Outlet /> {/* Changes dynamically based on the route */}
        </main>
      </>
    );
  }