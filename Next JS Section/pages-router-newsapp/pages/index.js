// main root file -> domain.com/
import Link from "next/link";
export default function HomePage() {
  return (
    <>
      <h1>This is the home page</h1>
      <ul>
        <li>
          <Link href="/news/next-js-rocks">Next.js Rocks</Link>
        </li>
      </ul>
    </>
  );
}
