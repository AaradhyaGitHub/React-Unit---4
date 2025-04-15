import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <header>
      <p>
        View Meals here! 
        <Link href="/meals">meals</Link>
      </p>
      <p>
        Community
        <Link href="/community">community</Link>
      </p>


      </header>
      
    </main>
  );
}
