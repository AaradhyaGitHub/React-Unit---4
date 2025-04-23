import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";
import fs from "node:fs/promises";

export default async function Home() {
  // Create the promise on the server
  const usersPromise = new Promise(async (resolve) => {
    // Simulate delay
    await new Promise((r) => setTimeout(r, 2000));
    
    // Fetch data
    const data = await fs.readFile("dummy-db.json", "utf-8");
    const users = JSON.parse(data);
    
    // Resolve with the users data
    resolve(users);
  });

  return (
    <main>
      <Suspense fallback={<p>Loading users.....</p>}>
        <UsePromiseDemo usersPromise={usersPromise} />
      </Suspense>
    </main>
  );
}