import {
  createBrowserRouter,
  RouterProvider,
  routerProvider
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Products from "./components/Products";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/products", element: <Products /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
