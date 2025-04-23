
- In a Next.js project, the console.log never show up on developer's tool on the browser 
- It rather shows up on the terminal or to be more specific, on the server side 

- So even though these components look exactly like Native React like a vite based React project
- A Next.js project has special project setup which causes this server side component rendering 

- Adding a directive at the top of the component, turns the component to a client side component. 
    This is the "use client" directive 

- Using "use client" on the top will make the component render on both sides. Server and Client side 


Why do this? What's the advantage of the duality? 
- When rendered in Server side, the client side doesn't need to download all the code required for the component 
- We can fetch data on the server so we can send finished data rather than fetching it in the browser
- We can still use async await 
- Component is rendered on the server side and the result which is the HTML is sent to the client 


Why convert it to Client Component? 
- To use features like useState or to make UI changes based on the action that user takes on the client side 
- Mostly to use Client-side features 


--- 

Combining RSC and Client Components 

- RSC can directly include CSC in their JSX 
- CSC cannot directly include RSC in their code 
- CSC CAN include RSC as children in their code 


For example you take a client component 
```jsx
'use client'
export default function ClientDemo({ children }) {
  console.log("ClientDemo rendered");
  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      {children}
    </div>
  );
}
```
and then you wrap it around a server component in the pages.js page like:
```jsx
export default function Home() {
  return (
    <main>
      <ClientDemo>
        <RSCDemo />
      </ClientDemo>
    </main>
  );
}
```



