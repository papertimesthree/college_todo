import { addMonths, format, getDaysInMonth } from "date-fns";
import { useContext, useState } from "react";
import Button from "../components/Button";
import AppContext from "../utils/app-context";

export default function Calendar() {
  let [d, setD] = useState(new Date());
  let { todos, cals } = useContext(AppContext);

  let dd = new Date(d);
  dd.setDate(1);

  let blanks = [...Array(dd.getDay())];
  let ar = [...Array(getDaysInMonth(d)).keys()];

  function prev() {
    setD(addMonths(d, -1));
  }

  function next() {
    setD(addMonths(d, 1));
  }

  function today() {
    setD(new Date());
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between m-2">
        <button
          className="border rounded bg-gray-300 px-1 hover:bg-blue-100"
          onClick={prev}
        >
          Prev
        </button>
        <h1 className="text-center text-2xl" onClick={today}>
          {format(d, "yyyy MMMM")}
        </h1>
        <button
          className="border rounded bg-gray-300 px-1 hover:bg-blue-100"
          onClick={next}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 h-5/6 text-center text-2xl ">
        {"sun,mon,tue,wed,thur,fri,sat".split(",").map((v) => (
          <div className="border">{v}</div>
        ))}
        {blanks.map((_, i) => (
          <div className="border"></div>
        ))}
        {ar.map((v) => (
          <Cell
            key={v}
            date={v + 1}
            CT={[...cals].filter(
              (todo) =>
                todo.deadline.getDate() === v + 1 &&
                todo.deadline.getMonth() === d.getMonth()
            )}
            events={[...todos].filter(
              (todo) =>
                todo.deadline.getDate() === v + 1 &&
                todo.deadline.getMonth() === d.getMonth()
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Cell({ date, events, CT }) {
  let { setTodos } = useContext(AppContext);

  function toggle(id) {
    setTodos((todos) =>
      todos.map((v) => (v.id === id ? { ...v, done: !v.done } : v))
    );
  }
  return (
    <div className="border">
      {date}
      {events.map((ev) => (
        <Button key={ev.id} className="text-sm" onClick={() => toggle(ev.id)}>
          {ev.done ? "✅" : ""}
          {ev.name}
        </Button>
      ))}

      <div className="bg-pink-500 text-white">
        {CT.length > 0 ? CT[0].name : ""}
      </div>
    </div>
  );
}
