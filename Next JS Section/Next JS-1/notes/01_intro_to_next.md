# Comprehensive Introduction to Next.js

## The App Folder - Foundation of Next.js

The `app/` folder serves as the cornerstone of any Next.js project.

```
project-root/
├── app/            <- Most important folder
│   ├── page.js     <- Root page component
│   ├── layout.js   <- Root layout component
│   ├── globals.css
│   └── icon.png    <- Favicon
└── ...
```

- This is where you set up the pages in your website
- You'll find `page.js` here which is a reserved filename
- `page.js` tells Next.js that it should render a page
- It's simply a React component in the end
- The special thing here is that it is a server component

### Server Components Explained

Server components represent a fundamental concept in Next.js that differentiates it from traditional React applications.

| Characteristic | Server Component | Client Component |
|----------------|-----------------|-----------------|
| Execution Location | Rendered on server | Rendered in browser |
| Console logs appear in | Terminal running Next.js | Browser console |
| File designation | Default in Next.js | Must add `"use client"` directive |
| Data fetching | Direct access to backend | Requires API calls |
| Bundle impact | Not sent to client | Included in JS bundle |

- A type of component that is embraced by Next.js and not as simple as React components
- This component function is rendered in the server
- For example: if you put a console.log element in here, you won't see the log statement in the browser but rather in the terminal where your local server is running
- Executed on the backend side, not on the client side
- Regular React component, just treated differently
- The return JSX is then sent over wire to browser then to be executed as HTML

---

## Adding Routing via File System

Next.js uses a file-system based router where folders define routes.

### How to add a second page?
For instance if I want a `//localhost:3000/about`

- Using React, we can use React-router
- But, using Next.js, the app folder directory is the key
  - So if we want `/about` -> we need -> `about` folder 📁
  - Next, (no pun intended) you should add another `page.js` file
  - Now, you have the root `page.js` and then you have nested `page.js` in the about folder for the about page content
  - Inside this `page.js`, you can name the function `AboutPage()` -> Naming doesn't matter here
  - Now, we can access `AboutPage()` content via http://localhost:3000/about

```
app/
├── page.js         <- Root page (/)
├── about/          <- Creates /about route
│   └── page.js     <- About page content
└── ...
```

### How to access About page without manually updating URL
A link to about page would be nice

- Something as simple as 
  ```jsx
  <p>
    <a href="/about">About Us</a>
  </p>
  ```
  works but there is a flaw
- If we refresh, the refresh browser icon shortly turns into a cross or an X
- This is an indication that a brand new page was downloaded from the backend
  - We left the current page
  - This is drifting away from the SPA (Single Page Application) architecture
  - Next.js allows us to stay on a single page and update UI with client-side JS code
  - So you can have a dynamic and interactive way to get to a desired page, but if you want to hop on the finished page right away, the server will still develop that page and send it to the client side

### How to implement proper navigation?

- The regular anchor element `<a>` is the culprit - We need a special component called `Link` provided by Next.js
- `import Link from 'next/link'`
- It takes `href` prop and other props like `className` but you can still stay on one page
- So simply change it to `<Link href="/about">About Us</Link>`

| Traditional HTML | Next.js |
|-----------------|---------|
| `<a href="/about">About</a>` | `<Link href="/about">About</Link>` |
| Full page reload | Client-side navigation |
| Loses React state | Preserves React state |
| Multiple HTML documents | SPA experience |

---

## Working with Pages and Layouts

Along side the root `page.js` we also have a root `layout.js`

- `page.js` defines content of a page and the `layout.js` defines the shell around one or more pages
- It's the layout into which the page will be rendered. Every Next.js page requires one `layout.js` declaration
- You can also nest this just like we nested `page.js` file earlier
- This has a `children` prop that will be nested inside the HTML and body tag
- What about head element and other metadata? This isn't rendered here
- We rather export it using a special variable called `metadata`
- `metadata` is a reserved name. It contains a JS object with props like `title` and `description`
- What about the children? It's the content. Layout is the wrapper, page is the content

### Layout.js Example Code

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

### Visual Representation of Layout and Page Relationship

```
┌─────────────────────────────┐
│          layout.js          │
│ ┌─────────────────────────┐ │
│ │        page.js          │ │
│ │                         │ │
│ │    Actual Content       │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

---

## How to Organize a Next.js Project

- There are other files here like the `globals.css` which is imported to the root `layout.js`
- We have `icon.png` which is also reserved. This will act as a favicon by Next.js
- We don't have an icon in Layout but since we have `icon.png` in the directory, we still have a favicon
- This goes to show the importance of the App directory when working with Next.js project
- But we're not limited
- For instance you can create your own `header.js` (could also be named `Header.jsx`) which will act as a regular vanilla React.js component

> **Important**: These filenames are only reserved when creating them inside of the `app/` folder (or any subfolder). Outside of the `app/` folder, these filenames are not treated in any special way.

### Reserved Filenames in Next.js

| Filename | Purpose |
|----------|---------|
| `page.js` | Create a new page (e.g., `app/about/page.js` creates a `<your-domain>/about` page) |
| `layout.js` | Create a new layout that wraps sibling and nested pages |
| `not-found.js` | Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts) |
| `error.js` | Fallback page for other errors (thrown by sibling pages or nested pages or layouts) |
| `loading.js` | Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data |
| `route.js` | Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format) |

--- 

## Configuring Dynamic Routes and Using Route Parameters 

Next.js provides an elegant solution for dynamic routing through a special folder naming convention.

- There is a reserved syntax for dynamic routing: `[slug]`
- Square brackets `[]` tell Next.js that we want to have some path segment after the folder name in which `[slug]` is nested 
- For this example, we have a folder called `blog` and inside it we have `[slug]`, so Next knows we will have some segment after `/blog`
- Now you can use this to dynamically fetch data, say from a database

### Dynamic Routes Folder Structure

```
app/
├── blog/
│   ├── page.js         <- /blog
│   └── [slug]/         <- Creates dynamic route
│       └── page.js     <- /blog/any-value
└── ...
```

### Example of a Dynamic Page Component:

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

### Understanding the `params` Props

In Next.js dynamic routes, the `params` object is automatically passed to your page component as a prop. This object contains all dynamic segments defined in your route.

- If your route is `app/blog/[slug]/page.js`, then visiting `/blog/hello-world` would result in `params.slug` being equal to `"hello-world"`
- Multiple parameters are possible: `app/blog/[category]/[slug]/page.js` would capture both `params.category` and `params.slug`
- These parameters are extracted from the URL path by Next.js automatically

### Next.js Routes vs React Router

| Feature | Next.js | React Router |
|---------|---------|--------------|
| Route Definition | File system based<br>`app/blog/[slug]/page.js` | Component based<br>`<Route path="/blog/:slug" element={<BlogPost />} />` |
| Parameter Access | Props-based<br>`function Page({ params }) {...}` | Hook-based<br>`const { slug } = useParams()` |
| Navigation | `<Link href="/blog/post-1">Post 1</Link>` | `<Link to="/blog/post-1">Post 1</Link>` |
| Nested Layouts | Automatic via `layout.js` | Manual with nested routes and outlets |
| Loading States | Built-in via `loading.js` | Requires custom implementation |
| Error Handling | Built-in via `error.js` | Requires error boundaries |

Dynamic routes in Next.js are extremely powerful as they're integrated with the file system and automatically pass the captured parameters to your components. This makes creating dynamic content much simpler compared to traditional React applications.