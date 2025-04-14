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
  </p> works but there is a flaw
-
