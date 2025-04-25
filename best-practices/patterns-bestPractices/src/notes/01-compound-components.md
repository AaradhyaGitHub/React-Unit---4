What are compound components?

> React components that don't work on their own but only in conjunction
> select, option HTML tags for instance aren't useful on their own. Option is meant to use inside select. We can call these compond elements but in the context of HTML

We'l explore something similar in React.

Let's start with this:

```jsx
import Accordion from "./ components/Accordion/Accordion";
import AccordionItem from "./ components/Accordion/AccordionItem";

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
              <p>You can&apos;t go wrong with us</p>
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

---

#Improvement #1:

Combining 2 functions into 1:

```jsx
import { createContext, useContext, useState } from "react";

const AccordianContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordianContext);
  if (!ctx) {
    throw new Error(
      "Accordion related components must be wrapped by <Accordion>"
    );
  }
  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenId] = useState();

  function toggleItem(id) {
    setOpenId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId: openItemId,
    toggleItem: toggleItem
  };
  return (
    <AccordianContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordianContext.Provider>
  );
}
```

And we change how we are using that:

```jsx
import { useAccordionContext } from "./Accordion";

export default function AccordionItem({ id, className, title, children }) {
  const { openItemId, toggleItem } = useAccordionContext();

  const isOpen = openItemId === id;

  return (
    <li className={className}>
      <h3 onClick={() => toggleItem(id)}>{title}</h3>
      <div
        className={
          isOpen ? " accordion-item-content open" : "accordion-item-content"
        }
      >
        {children}
      </div>
    </li>
  );
}
```

Merging identifiers into one object:

We added this in Accordion.jsx :

```jsx
Accordion.Item = AccordionItem;
```

And in App.jsx we use Accordion.Item:

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
              <p>You can&apos;t go wrong with us</p>
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

export default App;
```
