import ClientDemo from "@/components/ClientDemo";
import DataFetchingDemo from "@/components/DataFetchingDemo";
import RSCDemo from "@/components/RSCDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";

export default async function Home() {
  //simulating 2 sec data fetching time delay
  //await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main>
      {/* Client, RSC Demo */}
      <ClientDemo>
        <RSCDemo />
      </ClientDemo>

      {/*Data Fetching Demo */}
      <DataFetchingDemo />

      {/* Server Action Demo */}
      <ServerActionsDemo />

      {/* use() hook with Promises */}
      <Suspense fallback={<p>Loading users.....</p>}>
        <UsePromiseDemo />
      </Suspense>
    </main>
  );
}
