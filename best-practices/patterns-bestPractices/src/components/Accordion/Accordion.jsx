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
    <AccordianContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordianContext.Provider>
  );
}
