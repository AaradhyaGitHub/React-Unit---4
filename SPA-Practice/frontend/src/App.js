import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage, { loader as eventsLoader } from "../src/pages/EventsPage";
import EventDetailPage from "../src/pages/EventDetailPage";
import NewEventPage from "../src/pages/NewEventPage";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Homepage";
import EventsRouteLayout from "./pages/EventsRouteLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      {
        path: "events",
        element: <EventsRouteLayout />,
        children: [
          {
            index: true,
            path: "",
            element: <EventsPage />,
            loader: eventsLoader
          },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EventsPage /> }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
