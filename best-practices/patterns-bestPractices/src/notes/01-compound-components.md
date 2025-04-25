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
