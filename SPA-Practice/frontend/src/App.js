import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventsPage, { loader as eventsLoader } from "../src/pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeleteAction
} from "../src/pages/EventDetailPage";
import NewEventPage from "../src/pages/NewEventPage";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Homepage";
import EventsRouteLayout from "./pages/EventsRouteLayout";
import ErrorPage from "./pages/ErrorPage";
import EditEventPage from "./pages/EditEventPage";
import { action as manipulateEventAction } from "./components/EventForm";

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
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDeleteAction
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction
              }
            ]
          },

          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction
          }
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
