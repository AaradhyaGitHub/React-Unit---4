import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import ProductDetail from "./pages/ProductDetail";

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
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <Products /> },
      // the /: tells react, the value after will be dynamic
      //        you could have more value after that like /products/:productId/new
      { path: "/products/:productId", element: <ProductDetail /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
