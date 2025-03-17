import { Outlet } from "react-router-dom";


import MainNavigation from "../components/MainNavigation";
export default function RootLayout() {
  // import { useNavigation } from "react-router-dom";
  // const navigation = useNavigation();
  // {navigation.state === 'loading' && <p>Loading...</p>}


  
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
