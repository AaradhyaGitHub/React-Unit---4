```jsx
import fs from "node:fs";

export default function ServerActionsDemo() {
  async function saveUserAction(formData) {
    "use server";
    const data = fs.readFileSync("dummy-db.json", "utf-8");
    const instructors = JSON.parse(data);
    const newInstructor = {
      id: new Date().getTime().toString(),
      name: formData.get("name"),
      title: formData.get("title")
    };

    instructors.push(newInstructor);
    fs.writeFileSync("dummy-db.json", JSON.stringify(instructors));
  }

  return (
    <div className="rsc">
      <h2>Server Actions</h2>
      <p>
        A "Form Action" converted to a "Server Action" via{" "}
        <strong>"use server"</strong>.
      </p>
      <p>Can be defined in a server component or a separate file.</p>
      <p>Can be called from inside server component or client component.</p>
      <form action={saveUserAction}>
        <p>
          <label htmlFor="name">User name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </p>
        <p>
          <button>Save User</button>
        </p>
      </form>
    </div>
  );
}
```

This formAction function is a server action "It must be async"

- Server action is a form Action but executed on the server side, not client side
- formAction can be used in Native React but not server action
- It can only be defined inside a component if the component is not a Client Component which makes sense.

  - Why would you create server action inside a component and tell that component to run on the client

- However, this can still be done. You simply cannot define it in a Client defined component
- It can be outsourced to a different file where we use the 'use server' directory
- Then simply import the server action function and use it in the Client Side component

--- use Hook and Promises ---

use() for Promises and Data Fetching.

- use can be used to connect to some context value
- it can also be used to await promises in the client componnent wihtout making the component aasync which obivously isn't allowed.
- it works with Suspense

But, it only works with Special kind of promises:

- Promises created in your component can't be used
- Only works with promises created via libraries that integrate with React's suspense feature

For example:

```jsx
import fs from "node:fs/promises";

export default async function UsePromiseDemo() {
  //simulating 2 sec data fetching time delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await fs.readFile("dummy-db.json", "utf-8");
  const users = JSON.parse(data);
  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

The pain point we are trying to address here is, sometimes when we fetch data, it takes time like for a promise to be resolved
In this time, we show nothing and show everything once the data has been reeived which is obviosly not the best User Experience

We can implement Suspense here like this: 
```jsx
<Suspense fallback={<p>Loading users.....</p>}>
        <UsePromiseDemo />
      </Suspense>
```

Suspense works here because Suspense is compatible with UsePromiseDemo as it's a RSC where we are fetching data and Suspense is compatible here with this kind of promise 