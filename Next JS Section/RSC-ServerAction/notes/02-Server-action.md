````md
# 🧠 Understanding Server Actions, `use server`, and the Mysterious `use()` Hook in Next.js

This guide walks through server actions, how to use them properly in Next.js, and dives into React's `use()` hook — all without throwing away your mental sanity.

---

## 💾 The Server Action Setup

Here's an example of how a server action is implemented inside a Server Component:

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
````

---

### 🧩 Notes on Server Actions

- This `formAction` function is a server action. **It must be `async`.**
- A **server action** is just a form action — but it's executed on the **server side**, not the client.
- `formAction` can be used in native React (like Vite), but **not `server action`** — that's Next.js magic.
- It can only be defined inside a component if that component **is not** a Client Component. Which makes sense:

> Why would you create a server action inside a component and then tell that component to run on the client?

- However, this _can still be done_. You just **cannot define it in a client-defined component.**
- Instead, you can outsource the function to a **separate file** where `"use server"` is declared.
- Then, you simply **import** the server action function and use it in a client-side component.

---

## 🧪 `use()` Hook & Promise Handling

> `use()` for Promises and Data Fetching: it’s not just a gimmick, it’s an experimental superpower.

- `use()` can be used to connect to some **context value**
- It can also be used to **await promises inside a component** **without** making the component itself `async` (which is not allowed in client components).
- It **works with Suspense** out of the box.

---

### ⚠️ Caveats of `use()`

- It only works with **special kinds of promises** — the kind that plays well with React Suspense.
- Promises **created inside your component** can’t be used with `use()`.
- Only works with **promises created via libraries that integrate with React's Suspense system.**

---

### Example of a Compatible Promise in a Server Component

```jsx
import fs from "node:fs/promises";

export default async function UsePromiseDemo() {
  // Simulating 2-second data fetching delay
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

---

## 🧊 The Pain Point We're Solving: Loading State UX

When you fetch data that takes time, the default behavior is:  
🕳️ show nothing ➡️ wait ➡️ BAM — show everything once data is loaded.  
That sucks for UX.

We can fix that with **React’s `Suspense`** component:

```jsx
<Suspense fallback={<p>Loading users.....</p>}>
  <UsePromiseDemo />
</Suspense>
```

- `Suspense` works here because it's wrapping a **React Server Component** (`UsePromiseDemo`)
- That component is using **data fetching** with a supported kind of promise
- So, the user sees a nice loading message while the data is on its way ⏳

---

### ✍️ TL;DR Recap

- Server Actions are async functions marked with `"use server"` — can be called from forms.
- They must live in server components or be imported into client components.
- `use()` lets you await certain promises inside components without going async.
- Works great with `Suspense`, but only if the promise comes from the right source.

---
