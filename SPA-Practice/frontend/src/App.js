import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import EventsPage, { loader as eventsLoader } from "../src/pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader
} from "../src/pages/EventDetailPage";
import NewEventPage from "../src/pages/NewEventPage";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Homepage";
import EventsRouteLayout from "./pages/EventsRouteLayout";
import ErrorPage from "./pages/ErrorPage";
import EditEventPage from "./pages/EditEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
          {
            path: ":eventId",
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />
              },
              { path: "edit", element: <EditEventPage /> }
            ]
          },

          { path: "new", element: <NewEventPage /> }
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
