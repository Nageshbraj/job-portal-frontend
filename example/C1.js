import { useContext } from "react";
import CountContext from "./count-context";

export default function C1() {
  const { count } = useContext(CountContext);
  return (
    <div>
      <h2>C1 Component - {count}</h2>
    </div>
  );
}
