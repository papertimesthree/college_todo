import { addMonths, format, getDaysInMonth } from "date-fns";
import { useContext, useState } from "react";
import Button from "../components/Button";
import AppContext from "../utils/app-context";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
    <div className="container mx-auto p-4 m-4 rounded-2xl bg-white">
      <div className="flex justify-end items-center">
        <div className="flex-none w-16"></div>
        <div className="flex flex-grow justify-center items-center m-2">
          <FaArrowLeft className="text-xl" onClick={prev} />
          <h1 className="text-center text-2xl mx-2" onClick={today}>
            {format(d, "yyyy MMMM")}
          </h1>
          <FaArrowRight className="text-xl" onClick={next} />
        </div>
        <img
          src="img/icon_calendar-silhouette.png"
          className="h-8 w-8 mr-1"
          alt="calendar"
        />
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
      <div className="flex justify-end pt-4 ">
        <img src="img/icon_add_circle.png" alt="plus sign" className="w-8" />
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
      <div
        className={`${
          date === new Date().getDate() ? "text-blue-500" : "text-black"
        }`}
      >
        {date}
      </div>
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
