import { addMonths, format, getDaysInMonth } from "date-fns";
import { useContext, useState } from "react";
import Button from "../components/Button";
import AppContext from "../utils/app-context";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGreaterThan,
  FaLessThan
} from "react-icons/fa";

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
      <div className="flex justify-end items-center font-cute">
        <div className="flex-none w-16"></div>
        <div className="flex flex-grow justify-center items-center m-2 d-text-darkgray ">
          <FaLessThan className="text-xl" onClick={prev} />
          <h1 className="text-center text-2xl mx-2 -mt-1" onClick={today}>
            {format(d, "yyyy MMMM")}
          </h1>
          <FaGreaterThan className="text-xl" onClick={next} />
        </div>
        <div className="h-8 w-8 border-pink-700 relative">
          <img
            src="img/icon_calendar-silhouette.png"
            className="h-8 w-8 mr-1"
            alt="calendar"
          />
          <div className="absolute top-0 left-0 h-full w-full flex justify-center align-center">
            <div className="mt-1.5 text-white">{new Date().getDate()}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center d-text-gray font-noto">
        {"sun,mon,tue,wed,thur,fri,sat".split(",").map((v) => (
          <div className="capitalize font-cute">{v}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 h-5/6 text-center text-2xl ">
        {blanks.map((_, i) => (
          <div className=""></div>
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
    <div className="flex flex-col items-center">
      <div
        className={`${
          date === new Date().getDate() ? "text-blue-500" : "d-text-gray"
        }
        text-base font-noto
        `}
      >
        {date}
      </div>
      <div className="flex space-x-0.5 h-4">
        {events.map((ev, i) => (
          <div
            key={ev.id + i}
            className={`text-sm ${
              ev.done ? "d-bg-blue" : "bg-blue-200"
            } h-3 w-3 rounded-full`}
            onClick={() => toggle(ev.id)}
          />
        ))}
      </div>

      <div className="d-bg-red text-white text-xs font-cute px-2 rounded">
        {CT.length > 0 ? CT[0].name : ""}
      </div>
    </div>
  );
}
