import { useState } from "react";
import Output from "./Output";
export default function Greeting() {
  const [changeText, setChangeText] = useState(false);

  const changeTextHandler = () => {
    setChangeText(true);
  };
  return (
    <div>
      <h2>Hello World</h2>

      {!changeText ? <p>Good to see ya mate</p> : <Output>Howdy señor!</Output>}
      <button onClick={changeTextHandler}>Change Txt</button>
    </div>
  );
}
