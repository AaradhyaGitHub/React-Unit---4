# React Compound Components, Context API, and Custom Hooks

## Introduction

In this tutorial, we'll explore three powerful React patterns that work together to create flexible, reusable component systems:

1. **Compound Components** - Components that work together as a cohesive unit
2. **Context API** - React's built-in state management for component trees
3. **Custom Hooks** - Reusable logic extracted into functions

We'll build an Accordion component system step by step, gradually refining our approach to make it more flexible and maintainable.

## What are Compound Components?

Compound components are React components that work together to form a complete UI pattern. Think of HTML's `<select>` and `<option>` tags - they're designed to work together, with the `<option>` tags meant to be used inside a `<select>` tag. The parent component (`<select>`) manages the state and behavior, while child components (`<option>`) contribute to the interface.

In React, compound components typically:

- Share state implicitly through Context
- Have a clear parent-child relationship
- Only work when used together
- Provide a more intuitive and flexible API

## Starting Point

Let's begin with a basic Accordion implementation:

```jsx
// App.jsx
import Accordion from "./components/Accordion/Accordion";
import AccordionItem from "./components/Accordion/AccordionItem";

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <AccordionItem
            className="accordion-item"
            title="We got 20 years of experience"
          >
            <article>
              <p>You can't go wrong with us</p>
              <p>
                We are in the business of planning highly individualized trips
                for more than 20 years
              </p>
            </article>
          </AccordionItem>
          <AccordionItem
            className="accordion-item"
            title="We work with local guides"
          >
            <article>
              <p>We aren't doing this from our office</p>
              <p>
                We are in constant communication with local guides to ensure you
                make the most out of your trip
              </p>
            </article>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}

export default App;
```

But how do we implement the `Accordion` and `AccordionItem` components? This is where the Context API and custom hooks come into play.

## Understanding Context API

The Context API solves a common problem in React: **prop drilling** - passing props through multiple layers of components just to reach a deeply nested component.

### How Context Works

Context creates a way to share values between components without passing props through every level. It consists of:

1. **Context Object** - Created with `createContext()`
2. **Provider** - Wraps components that need access to the context value
3. **Consumer** - Used by components that need to read the context value

Let's visualize the flow:

```
┌─────────────────────────────────────────┐
│ Context.Provider (value={someData})     │
│  ┌───────────────────────────────────┐  │
│  │ Parent Component                  │  │
│  │  ┌───────────────────────────┐    │  │
│  │  │ Child Component           │    │  │
│  │  │  ┌───────────────────┐    │    │  │
│  │  │  │ Nested Component  │    │    │  │
│  │  │  │                   │    │    │  │
│  │  │  │ useContext()      │◄───┼────┼──┼─── Accesses context value
│  │  │  └───────────────────┘    │    │  │    directly from Provider
│  │  └───────────────────────────┘    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Custom Hooks

Custom hooks are JavaScript functions that:

- Start with the word "use" (e.g., `useAccordion`)
- Can call other hooks
- Let you extract component logic into reusable functions

They're perfect for handling complex state management, API calls, form validation, or any logic you want to reuse across components.

## Building Our Accordion Component System

Let's build our accordion system step by step using these concepts.

### Step 1: Creating the Context and Provider

First, we need a context to manage which accordion item is currently open:

```jsx
// Accordion.jsx
import { createContext, useContext, useState } from "react";

// Create a context for accordion state
const AccordionContext = createContext();

// Custom hook to access accordion context
export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(
      "Accordion related components must be wrapped by <Accordion>"
    );
  }
  return ctx;
}

// Main Accordion component
export default function Accordion({ children, className }) {
  const [openItemId, setOpenId] = useState();

  function openItem(id) {
    setOpenId(id);
  }

  function closeItem() {
    setOpenId(null);
  }

  const contextValue = {
    openItemId: openItemId,
    openItem: openItem,
    closeItem: closeItem
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}
```

Let's break down what's happening:

1. We create an `AccordionContext` using `createContext()`
2. We define a custom hook `useAccordionContext()` to safely consume this context
3. The `Accordion` component uses `useState` to track which item is open
4. We create functions to open and close items
5. We provide these values and functions to all child components via the `AccordionContext.Provider`

### Step 2: Creating the Accordion Item Component

Now let's create the `AccordionItem` component that will consume our context:

```jsx
// AccordionItem.jsx
import { useAccordionContext } from "./Accordion";

export default function AccordionItem({ id, className, title, children }) {
  const { openItemId, openItem, closeItem } = useAccordionContext();

  const isOpen = openItemId === id;

  function handleClick() {
    if (isOpen) {
      closeItem();
    } else {
      openItem(id);
    }
  }

  return (
    <li className={className}>
      <h3 onClick={handleClick}>{title}</h3>
      <div className={isOpen ? "accordion-item-content open" : undefined}>
        {children}
      </div>
    </li>
  );
}
```

Let's examine the data flow:

```
┌───────────────────────────────────────────────────┐
│ Accordion Component                               │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ useState() → [openItemId, setOpenId]        │  │
│  └─────────────────────────────────────────────┘  │
│                      │                            │
│  ┌─────────────────────────────────────────────┐  │
│  │ Context Value:                              │  │
│  │ {                                           │  │
│  │   openItemId: openItemId,                   │  │
│  │   openItem: function(id) { setOpenId(id) }, │  │
│  │   closeItem: function() { setOpenId(null) } │  │
│  │ }                                           │  │
│  └─────────────────────────────────────────────┘  │
│                      │                            │
│                      ▼                            │
│  ┌─────────────────────────────────────────────┐  │
│  │ AccordionContext.Provider                   │  │
│  └─────────────────────────────────────────────┘  │
│                      │                            │
└──────────────────────┼────────────────────────────┘
                       │
            ┌──────────┴───────────┐
            │                      │
            ▼                      ▼
┌───────────────────────┐ ┌───────────────────────┐
│ AccordionItem #1      │ │ AccordionItem #2      │
│                       │ │                       │
│ useAccordionContext() │ │ useAccordionContext() │
│      │                │ │      │                │
│      ▼                │ │      ▼                │
│ isOpen = (openItemId  │ │ isOpen = (openItemId  │
│          === id)      │ │          === id)      │
│                       │ │                       │
│ onClick → handleClick │ │ onClick → handleClick │
└───────────────────────┘ └───────────────────────┘
```

This creates a working accordion system where:

1. The `Accordion` component maintains state about which item is open
2. Each `AccordionItem` can:
   - Check if it's the currently open item
   - Request to be opened or closed by calling functions from context

### Common Issues to Watch For

When implementing this pattern, watch for these common mistakes:

1. **Typos in context names**: Ensure consistency between `AccordionContext` and `AccordianContext` (notice the 'io' vs 'ia')
2. **Missing props**: Ensure the `id` prop is passed to `AccordionItem` components
3. **CSS class typos**: Ensure CSS class names match in your component and stylesheet

## Improving Our Implementation

### Improvement #1: Simplifying with a Toggle Function

We can simplify our implementation by combining the open and close functions:

```jsx
// Accordion.jsx
import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(
      "Accordion related components must be wrapped by <Accordion>"
    );
  }
  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenId] = useState();

  // Replace separate open/close with a single toggle function
  function toggleItem(id) {
    setOpenId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId: openItemId,
    toggleItem: toggleItem
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}
```

Then we update the `AccordionItem` component to use this simplified approach:

```jsx
// AccordionItem.jsx
import { useAccordionContext } from "./Accordion";

export default function AccordionItem({ id, className, title, children }) {
  const { openItemId, toggleItem } = useAccordionContext();

  const isOpen = openItemId === id;

  return (
    <li className={className}>
      <h3 onClick={() => toggleItem(id)}>{title}</h3>
      <div
        className={
          isOpen ? "accordion-item-content open" : "accordion-item-content"
        }
      >
        {children}
      </div>
    </li>
  );
}
```

### Improvement #2: Namespaced Components

We can improve the component API by namespacing our components. This makes the relationship between components clearer in the JSX:

```jsx
// Accordion.jsx (add at the bottom)
import AccordionItem from "./AccordionItem";

// Namespace the components
Accordion.Item = AccordionItem;

export default Accordion;
```

Now in our App component, we can use a more intuitive syntax:

```jsx
import Accordion from "./components/Accordion/Accordion";

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item
            id="experience"
            className="accordion-item"
            title="We got 20 years of experience"
          >
            <article>
              <p>You can't go wrong with us</p>
              <p>
                We are in the business of planning highly individualized trips
                for more than 20 years
              </p>
            </article>
          </Accordion.Item>
          <Accordion.Item
            id="local-guides"
            className="accordion-item"
            title="We work with local guides"
          >
            <article>
              <p>We aren't doing this from our office</p>
              <p>
                We are in constant communication with local guides to ensure you
                make the most out of your trip
              </p>
            </article>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  );
}
```

### Improvement #3: Breaking Down Components Further

For even more flexibility, we can break our components down further:

```jsx
// AccordionTitle.jsx
import { useAccordionContext } from "./Accordion";

export default function AccordionTitle({ id, children, className }) {
  const { toggleItem } = useAccordionContext();
  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
```

```jsx
// AccordionContent.jsx
import { useAccordionContext } from "./Accordion";

export default function AccordionContent({ id, children, className }) {
  const { openItemId } = useAccordionContext();
  const isOpen = openItemId === id;
  return (
    <div
      className={
        isOpen ? `${className ?? ""} open` : `${className ?? ""} close`
      }
    >
      {children}
    </div>
  );
}
```

And update our Accordion.jsx:

```jsx
// Accordion.jsx (add imports and namespaces)
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

// Namespace all components
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
```

Now our App.jsx can use an even more flexible syntax:

```jsx
import Accordion from "./components/Accordion/Accordion";

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item className="accordion-item">
            <Accordion.Title className="accordion-item-title" id="experience">
              We got 20 years of experience
            </Accordion.Title>
            <Accordion.Content
              className="accordion-item-content"
              id="experience"
            >
              <article>
                <p>You can't go wrong with us</p>
                <p>
                  We are in the business of planning highly individualized trips
                  for more than 20 years
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item className="accordion-item">
            <Accordion.Title className="accordion-item-title" id="local-guides">
              We work with local guides
            </Accordion.Title>
            <Accordion.Content
              className="accordion-item-content"
              id="local-guides"
            >
              <article>
                <p>We aren't doing this from our office</p>
                <p>
                  We are in constant communication with local guides to ensure
                  you make the most out of your trip
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  );
}
```

### Improvement #4: Nested Contexts for Better Data Flow

We can further improve our component system by using nested contexts to eliminate the need to specify the same ID twice:

```jsx
// AccordionItem.jsx
import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(
      "Accordion Item related components must be wrapped by <Accordion.Item>"
    );
  }
  return ctx;
}

export default function AccordionItem({ id, className, children }) {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}
```

Now we can update our Title and Content components to use this nested context:

```jsx
// AccordionTitle.jsx
import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitle({ children, className }) {
  const { toggleItem } = useAccordionContext();
  const id = useAccordionItemContext();

  return (
    <h3 className={className} onClick={() => toggleItem(id)}>
      {children}
    </h3>
  );
}
```

```jsx
// AccordionContent.jsx
import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionContent({ children, className }) {
  const { openItemId } = useAccordionContext();
  const id = useAccordionItemContext();

  const isOpen = openItemId === id;

  return (
    <div
      className={
        isOpen ? `${className ?? ""} open` : `${className ?? ""} close`
      }
    >
      {children}
    </div>
  );
}
```

With this nested context approach, we've simplified our App.jsx even further:

```jsx
import Accordion from "./components/Accordion/Accordion";

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We got 20 years of experience
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can't go wrong with us</p>
                <p>
                  We are in the business of planning highly individualized trips
                  for more than 20 years
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="local-guides" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We work with local guides
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>We aren't doing this from our office</p>
                <p>
                  We are in constant communication with local guides to ensure
                  you make the most out of your trip
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  );
}
```

## Complete Data Flow Visualization

Let's visualize how data flows through our complete compound component system:

```
┌─────────────────────────────────────────────────────────────────────┐
│ Accordion Component                                                 │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ useState() → [openItemId, setOpenId]                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                      │                                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ AccordionContext                                              │  │
│  │ {                                                             │  │
│  │   openItemId: openItemId,                                     │  │
│  │   toggleItem: function(id) {...}                              │  │
│  │ }                                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                      │                                              │
└──────────────────────┼──────────────────────────────────────────────┘
                       │
            ┌──────────┴───────────┐
            │                      │
            ▼                      ▼
┌───────────────────────┐ ┌───────────────────────┐
│ AccordionItem #1      │ │ AccordionItem #2      │
│                       │ │                       │
│ AccordionItemContext  │ │ AccordionItemContext  │
│ value={id}            │ │ value={id}            │
│      │                │ │      │                │
│      ├────────┐       │ │      ├────────┐       │
│      │        │       │ │      │        │       │
│      ▼        ▼       │ │      ▼        ▼       │
│   ┌──────┐ ┌──────┐   │ │   ┌──────┐ ┌──────┐   │
│   │Title │ │Content│   │ │   │Title │ │Content│   │
│   └──────┘ └──────┘   │ │   └──────┘ └──────┘   │
│      │        │       │ │      │        │       │
│      │        │       │ │      │        │       │
└──────┼────────┼───────┘ └──────┼────────┼───────┘
       │        │                │        │
       │        │                │        │
       ▼        ▼                ▼        ▼
   Gets ID   Gets ID &        Gets ID   Gets ID &
   from      openItemId       from      openItemId
   context   from context     context   from context
```

## Key Takeaways

### Context API

- Creates a way to share values between components without prop drilling
- Consists of a Provider that supplies values and consumers that use them
- Best for values that many components need (theme, user, UI state)

### Custom Hooks

- Start with "use" prefix
- Extract logic for reuse across components
- Can use other hooks internally
- Perfect for complex state logic, API calls, or UI behaviors

### Compound Components

- Work together as a cohesive system
- Share state implicitly through Context
- Create a more intuitive and flexible API
- Allow for better composition and customization

## Common Mistakes to Avoid

1. **Typos in context names**: Double-check spelling consistency
2. **Missing error handling**: Always validate context exists before using it
3. **Overusing context**: Use it for widely shared state, not everything
4. **Forgetting to namespace components**: Use dot notation (Component.SubComponent)
5. **Inconsistent IDs**: Ensure IDs match between related components

## Conclusion

Understanding Context, Custom Hooks, and Compound Components gives you powerful tools to create flexible, maintainable React components. By combining these patterns, you can build intuitive component APIs that are both easy to use and highly customizable.

The Accordion component we built demonstrates how these patterns work together:

- Context manages state across components
- Custom hooks make that state accessible
- Compound components create an intuitive API
- Nested contexts improve data flow

With these patterns mastered, you'll be able to create elegant component systems that are a joy to use and maintain.
