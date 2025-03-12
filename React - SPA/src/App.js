import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Products from "./components/Products";

{
  /*

    const routeDefinitions = createRoutesFromElements(
      <Route>
        <Route path="/" element = {<HomePage />} />
        <Route path="/products" element = {<Products />} />
      </Route>
    );
    const router = createBrowserRouter(routeDefinitions)

*/
}

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <Products /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
