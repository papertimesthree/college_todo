import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import "./styles.css";
import DashBoard from "./pages/Dashboard";
import MyColleges from "./pages/MyColleges";
import { FaUser, FaPhoenixFramework } from "react-icons/fa";
import ToDos from "./pages/ToDos";
import Friends from "./pages/Friends";
import { useContext, useEffect, useState } from "react";

import AppContext from "./utils/app-context";
import Messages from "./components/Messages";
import { auth } from "./utils/fb";
import firebase from "firebase";

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

  let [user, setUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ todos, setTodos, cals, setCals, user, setUser }}
    >
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex flex-1 bg-gray-200">
            <div className="hidden xl:block bg-white">
              <BottomNav />
            </div>
            <Switch>
              <Route path="/my-colleges" component={MyColleges} />
              <Route path="/todos" component={ToDos} />
              <Route path="/friends" component={Friends} />
              <Route path="/messages" component={Messages} />
              <Route exact path="/" component={DashBoard} />
            </Switch>
          </div>
          <div className="block xl:hidden">
            <BottomNav />
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

function BottomNav() {
  let [active, setActive] = useState("Dashboard");
  let { user } = useContext(AppContext);

  function signin() {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  function signout() {
    auth.signOut();
  }

  const NAV = [
    { name: "Dashboard", image: "home", link: "/" },
    { name: "My Colleges", image: "college-graduation", link: "/my-colleges" },
    { name: "To-Dos", image: "work-agenda", link: "/todos" },
    { name: "Friends", image: "friends", link: "/friends" }
  ];
  return (
    <footer className="flex justify-center items-center xl:items-start xl:flex-col xl:bg-white">
      {NAV.map((m) => (
        <Link to={m.link} onClick={() => setActive(m.name)} key={m.name}>
          <NavItem item={m} active={active === m.name} />
        </Link>
      ))}
      <div className="mx-5 py-3">
        <button
          className="d-bg-blue text-white px-4 py-1 rounded"
          onClick={user ? signout : signin}
        >
          {user ? <div>Sign Out</div> : "Sign In With Google"}
        </button>
      </div>
    </footer>
  );
}

function NavItem({ item, active }) {
  return (
    <div className="mx-5 py-3">
      <img
        className="w-6"
        src={`/img/icon_${item.image}${active ? "_active" : ""}.png`}
        alt=""
      />
      <div className="hidden xl:block xl:ml-1">{item.name}</div>
    </div>
  );
}

// deprecated
function TopNav() {
  return (
    <div className="h-14 bg-gray-400 p-4 flex justify-between items-center ">
      <div>
        <FaPhoenixFramework className="text-3xl text-red-700 transform hover:rotate-45 duration-500" />
      </div>
      <div>
        <FaUser className="text-xl" />
      </div>
    </div>
  );
}

//deprecated
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
