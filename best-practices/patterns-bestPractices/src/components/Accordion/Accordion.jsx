import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

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

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
