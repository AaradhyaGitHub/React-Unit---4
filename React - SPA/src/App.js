import {
  createBrowserRouter,
  RouterProvider,
  routerProvider
} from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
