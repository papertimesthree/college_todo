import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import "./styles.css";
import DashBoard from "./pages/Dashboard";
import MyColleges from "./pages/MyColleges";
import Calendar from "./pages/Calendar";
import { FaUser, FaGithub, FaPhoenixFramework } from "react-icons/fa";
import ToDos from "./pages/ToDos";
import Friends from "./pages/Friends";
import { useState } from "react";
import AppContext from "./utils/app-context";

export default function App() {
  let [todos, setTodos] = useState([
    {
      id: 1,
      name: "groceries",
      deadline: new Date("2021-10-02T06:00:00-08:00"),
      done: false
    },
    {
      id: 2,
      name: "coding homework",
      deadline: new Date("2021-10-04T06:00:00-08:00"),
      done: false
    },
    {
      id: 3,
      name: "essay",
      deadline: new Date("2021-10-14T06:00:00-08:00"),
      done: true
    }
  ]);

  let [cals, setCals] = useState([
    {
      id: 4,
      name: "UCLA",
      deadline: new Date("2021-10-12T06:00:00-08:00")
    },
    {
      id: 5,
      name: "UCSD",
      deadline: new Date("2021-10-14T06:00:00-08:00")
    },
    {
      id: 6,
      name: "UCI",
      deadline: new Date("2021-10-26T06:00:00-08:00")
    }
  ]);
  return (
    <AppContext.Provider value={{ todos, setTodos, cals, setCals }}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <TopNav />
          <div className="flex flex-1">
            <SideNav />
            <Switch>
              <Route path="/my-colleges" component={MyColleges} />
              <Route path="/todos" component={ToDos} />
              <Route path="/friends" component={Friends} />
              <Route exact path="/" component={DashBoard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

function TopNav() {
  return (
    <div className="bg-gray-400 p-4 flex justify-between items-center ">
      <div>
        <FaPhoenixFramework className="text-3xl text-red-700 transform hover:rotate-45 duration-500" />
      </div>
      <div>
        <FaUser className="text-xl" />
      </div>
    </div>
  );
}

function SideNav() {
  return (
    <div className="bg-gray-300 space-y-5 p-4 flex flex-col">
      <Link to="/">{"🏠"} DashBoard</Link>
      <Link to="/my-colleges">{"🏫"} My Colleges</Link>
      <Link to="/todos">{"📃"} To-Dos</Link>
      <Link to="/friends">{"👨‍👧‍👧"} Friends</Link>
    </div>
  );
}
