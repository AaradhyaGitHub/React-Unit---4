This is a good practice:

```jsx
return (
  <main>
    <ErrorBoundary fallback={<p>Something went wrong :(</p>}>
      <Suspense fallback={<p>Loading users.....</p>}>
        <UsePromiseDemo usersPromise={fetchUsersPromise} />
      </Suspense>
    </ErrorBoundary>
  </main>
);
```

This system allows us to:

1. UsePromiseDemo -> responsible to fetch data
2. Suspense -> responsible for loading state
3. ErrorBoundary -> responsible if loading goes wrong

This is a interesting pattern. Next.js has other ways of handling errors but this pattern as we've discussed allows us to create a simple yet efficient way of daling with data fetching when using combination of Server Components, use hook, Promises, data fetching, and Suspense component
