Intro to Next.js

The app folder is the most important folder in a Next.js project

- This is where you set up the pages in your website
- You'll find page.js here which is a reserved filename
- page.js tells next.js that it should render a page
- It's simply a react component in the end
- The special thing here is that it is a server component

WTF is a server component?

- A type of component that is embraced by Next.js and not as simple as React components
- This component function is rendered in the server
- For ex: if you put a console.log element in here and you won't see the log statement in the browser but rather in the
  terminal where your local server is running
- Executed on the backend side, not on the client side.
- Regular React component, just treated differently
- The return JSX is then sent over wire to browser then to be executed as HTML

---

--Adding Routing via File System--

How to add a second page?
For instance if I want a //localhost:3000/about

- Using React, we can use React-router
- But, using Next jS, the app folder directory is the key
  - So if we want /about -> we need -> about fodler📁
  - Next, (no pun inded) you should add another page.js file
  - Now, you have the root page.js and then you have nested page.js in the about folder for the about page content
  - Inside this page.js, you can name the funciton AboutPage() -> Naming doesn't matter here.
  - Now, we can access AboutPage() content via http://localhost:3000/about

-- How to access About page without manually updating url --
A link to about page would be nice

- Something as simple as <p>
  <a href="/about">About Us</a>
  </p> 
  works but there is a flaw
- If we refresh, the refresh browser icon shortly turns into a cross or an X
- This is an indication that a brand new page was downloaded form the backend.
  - We left the current page
  - This is drifing away from the SPA architecture
  - Next.js allows us to stay on a single page and update UI with client side jS code
  - So you can dynamically and interactive way to get to a desired page but if you want to hop on the finished page right away, the server will still develop that page and send it to the client side

How to get this?

- The regular anchor element <a> is the culprit - We need a especial component called Link provided by next.
- import Link form 'next/link
- it takes href prop and other props like className but you can still stay on one page
- So simple change it to <Link href="/about">About Us</Link>

-- Working with Pages and Layouts --

Along side the root page.js we also have a root layout.js

- page.js defines conent of a page and the layout.js defines the shell around one or more pages
- It's the layout into which the page will be rendered. Every next.js page requires one layout.js declaration
- You can also nest this just like we nested page.js file earlier
- This has a children prop that will be nested inside the html and body tag
- What about head element and other metadata? This isn't rendered here.
- We rather export it using a special variable called metadata.
- metadata is a resreved name. It contains a jS object with props like title and description
- What about the children? It's the content. Layout is the wrapper, page is the content.

Here is a layout.js example code

```jsx
import "./globals.css";

export const metadata = {
  title: "NextJS Course App",
  description: "Your first NextJS app!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

--- How to organize a NextJS Project ---

- There are other files here like the globals.css which is imported to the root layout.js
- We have icon.png which is also reserved. This will act as a favicon by Next.js
- We don't have an icon in Layout but since we have icon.png in the directory, we still have a favicon
- This goes to show the importance of the App diretory when working with Next.js project
- But we're not limited.
- For instance you can create your own header.js (could also be named Header.jsx) which will act as a regular vanilla
  React.js component

Important: These filenames are only reserved when creating them inside of the app/ folder (or any subfolder). Outside of the app/ folder, these filenames are not treated in any special way.

Here's a list of reserved filenames in NextJS -
page.js => Create a new page (e.g., app/about/page.js creates a <your-domain>/about page)

layout.js => Create a new layout that wraps sibling and nested pages

not-found.js => Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)

error.js => Fallback page for other errors (thrown by sibling pages or nested pages or layouts)

loading.js => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data

route.js => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)

--- 

Configuring Dynamic Routes and Using Route Parameters 

- There is a reserved syntax for dynamic routing -- [slug]
- [] tells Next.js that we want to have some path segment after the folder name in which [slug] is nested 
- For this example, we have a folder called blog and inside it we have [slug] so Next knows we will have some 
  segment after /blog 
- Now you can use this to dynamically fetch data say from a database. 
- Example: 
  ```jsx
  export default function BlogPostPage({ params }) {
  return (
    <main>
      <h1>Blog Post</h1>
      <p>{params.slug}</p>
    </main>
  );
}
```
Note to AI: Please elaborate explanation on this a little bit more. Like the params thing, the fact that it's passed as props. And try to make a table showing how it's similar to maybe some react-router way of doing things. 

--- 
