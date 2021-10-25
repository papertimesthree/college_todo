import Messages from "../components/Messages";
import ProgressBar from "../components/ProgressBar";
import { format } from "date-fns";
import Calendar from "./Calendar";
import AppContext from "../utils/app-context";
import { useContext } from "react";

const DATA = [
  { id: "asdsd1", from: "Bill", message: "Hello Buddy" },
  { id: "asdsd2", from: "Mary", message: "What's up?" },
  { id: "asdsd3", from: "William", message: "hola" },
  { id: "asdsdr4", from: "Joseph", message: "guten tag" }
];

const DEADLINES = [
  {
    id: "asdsd1",
    name: "USC",
    deadline: new Date("2021-10-12T06:00:00-08:00")
  },
  {
    id: "asdsd2",
    name: "Harvard",
    deadline: new Date("2021-09-24T06:00:00-08:00")
  },
  {
    id: "asdsd3",
    name: "Write Essay",
    deadline: new Date("2021-10-10T06:00:00-08:00")
  },
  {
    id: "asdsdr4",
    name: "Sleep",
    deadline: new Date("2021-09-14T06:00:00-08:00")
  }
];

export default function DashBoard() {
  let { user } = useContext(AppContext);
  return (
    <div className="container mx-auto p-4">
      <div>
        <img
          src={user?.photoURL}
          alt=""
          className="w-10 h-10 rounded-full mb-3 "
        />
      </div>
      <Progress />
      <Calendar />

      <div className="h-3" />
      <div className="flex">
        <div className="w-0 flex-1">
          <UpcomingDeadlines deadlines={DEADLINES} />
        </div>
      </div>
    </div>
  );
}

function Progress() {
  return (
    <div className="bg-white container mx-auto p-4 rounded-2xl ">
      <div className="flex justify-between items-end font-cute d-text-darkgray">
        <div className="text-2xl">Achieved</div>
        <div className="d-text-gray text-sm">5 ToDo</div>
      </div>

      <ProgressBar progressPercentage={75} />
    </div>
  );
}

function UpcomingDeadlines({ deadlines }) {
  const sortedDeadlines = deadlines.sort((a, b) => a.deadline - b.deadline);
  return (
    <div className="bg-white rounded-2xl p-4 ">
      <h1 className="font-sans text-2xl mb-4 font-cute d-text-darkgray">
        Upcoming Deadlines
      </h1>
      <div className="space-y-3">
        {sortedDeadlines.map((t, i) => (
          <div className="flex items-start bg-white p-1 m-1">
            <img
              src="img/icon_exclamation-mark.png"
              alt="exclamation mark"
              className="mt-2 mr-2"
            />
            <div>
              <div className="text-sm d-text-gray font-noto">
                {format(t.deadline, "yyyy MMMM d")}{" "}
              </div>
              <div className="font-noto">{t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
