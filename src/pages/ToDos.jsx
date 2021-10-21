import { useContext, useState } from "react";
import { FaCircle } from "react-icons/fa";
import Button from "../components/Button";
import AppContext from "../utils/app-context";
import Calendar from "./Calendar";

export default function ToDos() {
  let { todos, setTodos } = useContext(AppContext);

  let [view, setView] = useState("list");
  let [showForm, setShowForm] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    let entry = {
      id: 3,
      name: event.target.name.value,
      deadline: new Date(event.target.deadline.value),
      done: false
    };
    event.target.reset();
    setTodos([...todos, entry]);
  }

  function toggleDone(i) {
    let copy = [...todos];
    copy[i].done = !copy[i].done;
    setTodos(copy);
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Test Heading</h1>
      <div>
        <div className="inline-flex border p-1">
          <Button
            onClick={() => setView("calendar")}
            active={view === "calendar"}
          >
            Calendar
          </Button>
          <Button onClick={() => setView("list")} active={view === "list"}>
            List
          </Button>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-2xl mb-4">To Dos</h2>
          {view === "list" ? (
            <ListView todos={todos} toggleDone={toggleDone} />
          ) : (
            <Calendar />
          )}
        </div>
      </div>

      <div className="h-3" />

      {showForm ? (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
        >
          <form className="bg-gray-200 rounded-2xl p-2" onSubmit={onSubmit}>
            <div>
              <label className="block mb-1 p-1">Name</label>
              <input clasName="bg-blue-300" name="name" type="text" />
            </div>

            <div>
              <label className="block mb-1 p-1">Deadline</label>
              <input name="deadline" type="text" />
            </div>

            <div className="my-2">
              <label className="">important</label>
              <input type="checkbox" name="important" className="ml-2" />
            </div>

            <div>
              <Button type="submit" active>
                SUBMIT
              </Button>
              <Button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button
            active
            onClick={() => setShowForm(true)}
            className="rounded-full py-3 px-6  shadow"
          >
            <div className="flex items-center space-x-6">
              <div>Add To Do</div>
              <img src="img/icon_add.png" alt="add" className="h-4" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

function ListView({ todos, toggleDone }) {
  return (
    <div>
      {todos.map((t, i) => (
        <div className="flex justify-between  p-1 m-1">
          <span>{t.name}</span>
          <button onClick={() => toggleDone(i)}>
            {t.done ? (
              <img
                src="img/icon_checked_circle.png"
                alt="check"
                className="h-6"
              />
            ) : (
              <FaCircle className="opacity-30 w-6 h-6" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
