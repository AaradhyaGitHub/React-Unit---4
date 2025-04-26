# Understanding React Render Props and useRef

## Introduction

In this tutorial, we'll explore two powerful React patterns:

1. **Render Props** - A pattern for component composition through function props
2. **useRef Hook** - A way to persist values without causing re-renders

We'll build a `SearchableList` component that demonstrates both patterns, focusing on how useRef helps us implement debounce functionality.

## What are Render Props?

The render props pattern involves passing a function as a prop to a component. This function returns what should be rendered, giving the parent component control over how the child component renders its data.

### How Render Props Work

```jsx
// Component that accepts a render prop called "children"
<ParentComponent>{(data) => <SomeUI data={data} />}</ParentComponent>
```

In this pattern:

1. `ParentComponent` manages data/state
2. `ParentComponent` calls the function passed as `children`
3. The function receives data and returns JSX
4. `ParentComponent` renders the returned JSX

This creates a clean separation between:

- **Data handling** (in the parent component)
- **UI rendering** (defined by the component user)

## Understanding useRef Hook

The `useRef` hook is one of React's built-in hooks that provides a way to:

1. Store a mutable value that persists across renders
2. Access DOM elements directly

Unlike state variables created with `useState`, changing a ref's value **does not trigger a re-render**.

### Key Characteristics of useRef

- **Persistence**: The same ref object persists throughout the component's lifecycle
- **Mutability**: You can change `.current` without triggering re-renders
- **Accessibility**: Access via the `.current` property

### When to Use useRef

Use `useRef` when you need to:

- Store values without causing re-renders
- Reference DOM elements directly
- Keep track of previous values
- Store timeouts, intervals, or other non-React entities
- Implement debouncing (like in our example)

## Building a SearchableList Component

Let's build our `SearchableList` component step by step, focusing on both render props and `useRef`.

### Basic Structure

```jsx
import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
```

This implementation:

1. Takes `items` (data to be searched), `itemKeyFn` (function to generate keys), and `children` (render prop) as props
2. Uses `useState` to manage the search term
3. Filters items based on the search term
4. Renders the filtered items using the render prop pattern

### Adding Debounce with useRef

Now, let's enhance our component by adding debounce functionality with `useRef`:

```jsx
import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 900);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Deep Dive: Understanding the Code

Let's break down each part of our component:

### 1. Component Props

```jsx
function SearchableList({ items, itemKeyFn, children }) {
  // ...
}
```

- **items**: Array that contains the data to be searched and displayed
- **itemKeyFn**: Function that generates unique keys for each item
- **children**: A function that receives an item and returns JSX (the render prop)

### 2. State and Ref Setup

```jsx
const lastChange = useRef();
const [searchTerm, setSearchTerm] = useState("");
```

- `searchTerm`: State variable that holds the current search query
- `lastChange`: A ref that will store the timeout ID for our debounce implementation

### 3. Filtering Items

```jsx
const searchResults = items.filter((item) =>
  JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
);
```

This line:

1. Converts each item to a JSON string with `JSON.stringify()`
2. Converts both the item string and search term to lowercase
3. Uses `.includes()` to check if the search term appears in the item string
4. Returns only items that match the search term

### 4. Debounced Search Handler

```jsx
function handleChange(event) {
  if (lastChange.current) {
    clearTimeout(lastChange.current);
  }
  lastChange.current = setTimeout(() => {
    lastChange.current = null;
    setSearchTerm(event.target.value);
  }, 900);
}
```

This function:

1. Checks if there's an existing timeout stored in `lastChange.current`
2. If yes, clears that timeout to cancel the pending update
3. Creates a new timeout that will update the search term after 900ms
4. Stores the timeout ID in `lastChange.current`
5. Resets `lastChange.current` to null when the timeout completes

### 5. Render Method

```jsx
return (
  <div className="searchable-list">
    <input type="search" placeholder="Search" onChange={handleChange} />
    <ul>
      {searchResults.map((item) => (
        <li key={itemKeyFn(item)}>{children(item)}</li>
      ))}
    </ul>
  </div>
);
```

This JSX:

1. Renders a search input that calls `handleChange` on every keystroke
2. Maps through the filtered items
3. Generates a unique key using the `itemKeyFn` prop
4. **Calls the `children` function** with each item, rendering the result

## Visualizing useRef and Debouncing

Let's visualize how the debounce mechanism works:

```
┌─────────────────────────┐
│ User types "a"          │
└──────────────┬──────────┘
               │
               ▼
┌─────────────────────────┐
│ handleChange called     │
└──────────────┬──────────┘
               │
               ▼
┌─────────────────────────┐
│ lastChange.current:     │
│ null                    │
└──────────────┬──────────┘
               │
               ▼
┌─────────────────────────┐
│ Create timeout (900ms)  │
│ Store ID in             │
│ lastChange.current      │
└──────────────┬──────────┘
               │
               │◄──────────┐
               │           │
               │     ┌─────┴────────────────┐
               │     │ User types "ap"      │
               │     │ before timeout ends  │
               │     └─────┬────────────────┘
               │           │
               │     ┌─────┴────────────────┐
               │     │ Clear previous       │
               │     │ timeout              │
               │     └─────┬────────────────┘
               │           │
               │     ┌─────┴────────────────┐
               │     │ Create new timeout   │
               │     │ Store new ID in      │
               │     │ lastChange.current   │
               │     └─────┬────────────────┘
               │           │
               │           │
        After 900ms   After 900ms
               │           │
               ▼           ▼
┌─────────────────────────┐
│ setSearchTerm("ap")     │
└──────────────┬──────────┘
               │
               ▼
┌─────────────────────────┐
│ lastChange.current = null│
└──────────────┬──────────┘
               │
               ▼
┌─────────────────────────┐
│ Component re-renders    │
│ with new searchTerm     │
└─────────────────────────┘
```

This debounce pattern:

1. Prevents excessive state updates while typing
2. Only updates `searchTerm` after the user pauses typing
3. Improves performance for expensive filtering operations

## Why Use useRef for Debouncing?

You might wonder: "Why use `useRef` instead of a regular variable for debouncing?"

Here's why:

1. **Persistence across renders**: A regular variable would be reset every time the component re-renders. `useRef` maintains its value.

2. **No re-renders on update**: Changing `lastChange.current` doesn't trigger a re-render, which is exactly what we want.

3. **Component lifecycle awareness**: The ref stays with the component instance throughout its lifecycle.

If we tried to use a regular variable:

```jsx
let lastChange; // This would be reset on every render!

function handleChange(event) {
  if (lastChange) {
    clearTimeout(lastChange);
  }
  lastChange = setTimeout(() => {
    setSearchTerm(event.target.value);
  }, 900);
}
```

This wouldn't work because `lastChange` would be initialized to `undefined` on every render, causing multiple timeouts to run and preventing proper debouncing.

## The .current Property

You might be wondering why we have to use `.current` with useRef. This design serves several purposes:

1. **Mutable object**: The ref object `{ current: value }` is stable across renders, but its `.current` property can be modified.

2. **Consistency with DOM refs**: React uses the same pattern for DOM references.

3. **Type safety**: This structure makes it clear that this value can change, unlike props or regular state.

Think of the ref object itself as a box that stays the same, while the `.current` property is the content of the box that you can change.

## Using the SearchableList Component

Let's see how to use our component in action:

```jsx
import SearchableList from "./SearchableList";
import Place from "./Place";

// Data array
const PLACES = [
  {
    id: "african-savanna",
    image: savannaImg,
    title: "African Savanna",
    description: "Experience the beauty of nature."
  },
  {
    id: "amazon-river",
    image: amazonImg,
    title: "Amazon River",
    description: "Get to know the largest river in the world."
  }
  // More places...
];

function App() {
  return (
    <section>
      {/* Rendering places with a custom Place component */}
      <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
        {(item) => <Place item={item} />}
      </SearchableList>

      {/* Rendering simple strings directly */}
      <SearchableList
        items={["item 1", "item 2", "hello mate", "wassup foo", "we coo"]}
        itemKeyFn={(item) => item}
      >
        {(item) => item}
      </SearchableList>
    </section>
  );
}
```

Notice how we're using the render props pattern in both instances:

1. First usage: We pass a function that renders a `<Place>` component for each item
2. Second usage: We pass a function that directly renders the item string

## Key JavaScript Methods Used

### .filter()

```js
array.filter(callbackFn);
```

The `filter()` method creates a new array with elements that pass the test implemented by the provided function. In our case, we're keeping only items that match the search term.

### .includes()

```js
string.includes(searchString);
```

The `includes()` method determines whether a string contains another string, returning `true` or `false`. We use it to check if the item text contains the search term.

### .toLowerCase()

```js
string.toLowerCase();
```

The `toLowerCase()` method returns a string with all characters converted to lowercase. We use it to make our search case-insensitive.

### JSON.stringify()

```js
JSON.stringify(value);
```

This method converts a JavaScript value to a JSON string. We use it to convert our items (which might be objects) to searchable strings.

## Advanced Patterns and Considerations

### Alternative to Render Props: Component Props

Instead of a function as children, we could accept a component:

```jsx
function SearchableList({ items, itemKeyFn, ItemComponent }) {
  // ...
  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>
            <ItemComponent item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Usage
<SearchableList
  items={PLACES}
  itemKeyFn={(item) => item.id}
  ItemComponent={Place}
/>;
```

### Optimizing with useMemo

For large lists, we could optimize the filtering with `useMemo`:

```jsx
import { useRef, useState, useMemo } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    return items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Rest of component...
}
```

### Supporting Different Filtering Logic

We could make the filtering logic customizable:

```jsx
export default function SearchableList({
  items,
  itemKeyFn,
  children,
  filterFn = (item, term) =>
    JSON.stringify(item).toLowerCase().includes(term.toLowerCase())
}) {
  // ...

  const searchResults = items.filter((item) => filterFn(item, searchTerm));

  // Rest of component...
}
```

## Debugging useRef

When working with useRef, you might encounter these common issues:

1. **Forgotten `.current`**: Always access the value with `.current`

   ```jsx
   // Wrong
   if (lastChange) {
     /* ... */
   }

   // Correct
   if (lastChange.current) {
     /* ... */
   }
   ```

2. **Re-rendering on ref change**: Remember that changing a ref doesn't trigger re-renders

   ```jsx
   // This won't update the UI until something else causes a re-render
   lastChange.current = newValue;
   ```

3. **Using `useRef` for state**: If you need to re-render when a value changes, use `useState` instead

## Conclusion

The render props pattern and useRef hook are powerful tools in your React toolkit:

- **Render props** provide flexibility by separating data management from UI rendering
- **useRef** lets you persist values between renders without causing re-renders

Our SearchableList component demonstrates both concepts:

- It manages search state and filtering logic internally
- It uses `useRef` to implement debouncing without unwanted re-renders
- It uses the render props pattern to let users control how items are displayed

By mastering these patterns, you can create more flexible, efficient, and reusable React components.
