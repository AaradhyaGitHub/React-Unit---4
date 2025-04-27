# Understanding a Custom React Store from Scratch

This guide breaks down a custom state management solution in React, explaining how it works line by line to help you understand the core concepts behind state management libraries.

## Introduction

Your instructor has created a custom store implementation to demonstrate how to build optimized React apps without using third-party libraries like Redux or Context API. This is a valuable learning exercise to understand how state management systems work under the hood.

## Basic Store Mechanism - Version 1

Let's start by examining the first version of the store:

```jsx
import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((li) => li != setState);
    };
  }, [setState]);
};
```

### Line-by-Line Explanation

#### Setting Up the Store's Foundation

```jsx
import { useState, useEffect } from "react";
```

We import two essential React hooks:

- `useState`: To manage local component state
- `useEffect`: To handle side effects like subscribing to state changes

```jsx
let globalState = {};
let listeners = [];
let actions = {};
```

These three variables are declared outside of any component, making them "global" to the module:

- `globalState`: An empty object that will store all our application data
- `listeners`: An empty array that will store functions that need to be called when state changes
- `actions`: An empty object that will store functions that know how to update our state

#### The Custom Hook

```jsx
const useStore = () => {
```

This creates a custom hook named `useStore`. Any component that wants to access or modify the global state will use this hook.

```jsx
const setState = useState(globalState)[1];
```

This line is clever! It:

1. Calls React's `useState` hook with our `globalState` as the initial value
2. Takes only the second element from the returned array, which is the setter function
3. This will later be used to trigger re-renders in components using this hook

```jsx
const dispatch = (actionIdentifier) => {
  const newState = actions[actionIdentifier](globalState);
  globalState = { ...globalState, ...newState };

  for (const listener of listeners) {
    listener(globalState);
  }
};
```

The `dispatch` function:

1. Takes an action identifier (a string that identifies which action to perform)
2. Calls the corresponding action function from our `actions` object, passing the current state
3. Updates the global state by merging the new state with the existing state
4. Notifies all listeners (components) about the state change so they can update

```jsx
useEffect(() => {
  listeners.push(setState);

  return () => {
    listeners = listeners.filter((li) => li != setState);
  };
}, [setState]);
```

This `useEffect` hook:

1. Adds the component's `setState` function to our `listeners` array when the component mounts
2. Returns a cleanup function that removes this component's `setState` from the `listeners` array when the component unmounts
3. This ensures components are only updated when they're actually in the DOM

## Store Initialization - New Addition

```jsx
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, initialState };
  }
  actions = { ...actions, ...userActions };
};
```

### Explanation

This function initializes our store with:

1. Custom actions that will modify the state
2. An initial state to populate the store with data

- `userActions`: An object containing action functions that know how to update state
- `initialState`: The starting data for our application
- The function merges these with any existing actions and state

## Creating a Specific Store Instance

```jsx
import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (currState, productId) => {
      const prodIndex = currState.products.findIndex((p) => p.id === productId);
      const newFavStatus = !currState.products[prodIndex].isFavorite;
      const updatedProducts = [...currState.products];
      updatedProducts[prodIndex] = {
        ...currState.products[prodIndex],
        isFavorite: newFavStatus
      };
      return { products: updatedProducts };
    }
  };
  initStore(actions, {
    products: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false
      }
    ]
  });
};

export default configureStore;
```

### Explanation

This file creates a specific implementation of our store for managing products:

1. It defines an action called `TOGGLE_FAV` that:

   - Finds a product by ID
   - Toggles its `isFavorite` property
   - Creates a new array of products with the updated value
   - Returns the new products array wrapped in an object

2. It initializes the store with:
   - The `TOGGLE_FAV` action
   - Initial product data with four items

## Adding Payload Support to Dispatch

```jsx
const dispatch = (actionIdentifier, payload) => {
  const newState = actions[actionIdentifier](globalState, payload);
  globalState = { ...globalState, ...newState };

  for (const listener of listeners) {
    listener(globalState);
  }
};
```

### Explanation

This updated `dispatch` function now accepts a second parameter called `payload`:

1. `actionIdentifier`: Still identifies which action to perform
2. `payload`: Additional data needed by the action (like a product ID)
3. The action function now receives both the current state and the payload
4. This makes our actions more flexible and reusable

## How It All Works Together

1. The store is initialized with actions and initial state
2. Components import and use the `useStore` hook
3. When a component uses the hook, it's automatically registered as a listener
4. The component can call `dispatch` with an action name and optional payload
5. The action creates a new state object
6. All registered components are notified and re-render with the new state
7. When components unmount, they're removed from the listeners list

## Why This Is Useful

This custom store implementation:

1. Provides centralized state management without external libraries
2. Demonstrates the core concepts behind libraries like Redux
3. Shows how to implement a pub/sub pattern (publish-subscribe) in React
4. Creates a predictable flow for state updates

## Missing Pieces in the Original Code

There's one important part missing in the original code: the `useStore` hook doesn't return anything! To be useful, it should return at least:

1. The current state (or a part of it)
2. The `dispatch` function

It might look something like this:

```jsx
return [globalState, dispatch];
```

## Conclusion

This custom store implementation provides a simplified but powerful state management solution. It follows similar patterns to popular libraries like Redux but with much less code. Understanding how this works will help you make informed decisions about state management in your React applications and give you insight into how libraries like Redux work internally.
