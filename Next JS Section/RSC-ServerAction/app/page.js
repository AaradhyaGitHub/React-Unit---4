import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";
import fs from "node:fs/promises";
import ErrorBoundary from "@/components/ErrorBoundary";
export default async function Home() {
  // Create the promise on the server
  const fetchUsersPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users);
      reject(new Error("Dangerrrr"));
    }, 2000)
  );
  return (
    <main>
      <ErrorBoundary fallback={<p>Something went wrong :(</p>}>
        <Suspense fallback={<p>Loading users.....</p>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
