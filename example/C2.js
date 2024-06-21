import { useContext } from "react";
import CountContext from "./count-context";

export default function C2() {
  const { count, handleInc } = useContext(CountContext);

  return (
    <div>
      <h2>C2 Component - {count}</h2>
      <button onClick={handleInc}>+1</button>
    </div>
  );
}
