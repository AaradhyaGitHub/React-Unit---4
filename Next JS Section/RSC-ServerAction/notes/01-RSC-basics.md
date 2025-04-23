
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



