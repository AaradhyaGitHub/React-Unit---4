# Optimizing Data Fetching in React Router

## The Problem: Late Data Requests

Currently, we only start requesting event data **after landing on the events page**. This means:
- We **do not** begin fetching any earlier.
- The **entire component tree must render** before making the HTTP request.

### Why is this inefficient?
- If a component has deeply nested child components, we must **wait for all of them to render** before making a request.
- This introduces unnecessary delays, leading to **bad UX**, especially when fetching essential data.

## The React Router Solution

React Router allows us to **initiate data fetching as soon as navigation begins or a component starts loading**. This ensures:
- The component renders **with the fetched data** instead of waiting until it's fully mounted.

## Two Approaches to Data Fetching

1. **Render component first, then fetch data**
   - The UI displays a **loading state** while data is being fetched.
   - Standard approach but can lead to **delays in rendering meaningful content**.

2. **Fetch data first, then render the component** ✅
   - More efficient, as the component **only renders once the data is available**.
   - This is the approach React Router provides.

## Implementing Data Fetching with React Router Loaders

React Router offers a `loader` property, which allows us to fetch data **before rendering the component**:

```jsx
loader: () => {
    // Fetch data here before rendering the component
}
```

This ensures that our components receive data as soon as they are rendered, improving performance and user experience.