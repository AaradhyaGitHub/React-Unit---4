"use client";
import { use, useState } from "react";

export default function UsePromiseDemo({ usersPromise }) {
  const [count, setCount] = useState(0);
  // The use hook unwraps the promise and integrates with Suspense
  const users = use(usersPromise);

  return (
    <div className="rsc">
      <h2>Client Component with Server Data</h2>
      <p>
        Uses the <strong>use()</strong> hook to handle promises from the server.
      </p>
      <p>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          Increment
        </button>
        <span> Count: {count}</span>
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
