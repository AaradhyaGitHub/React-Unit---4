import classes from "./EventItem.module.css";
import { Link, useSubmit } from "react-router-dom";
function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    // gives us a susbmit function
    // we can pass 2 arguments...
    //1-> data to submit in Form element
    //2-> set the methods you would in a form

    const proceed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (proceed) {
      submit(null, {
        method: "delete"
      });
    } else {
    }
    // ...
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
