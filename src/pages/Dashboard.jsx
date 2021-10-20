import Messages from "../components/Messages";
import ProgressBar from "../components/ProgressBar";
import { format } from "date-fns";
import Calendar from "./Calendar";

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
  return (
    <div className="container mx-auto p-4">
      <img src="/img/icon_checked_circle.png" />
      <ProgressBar />
      <Calendar />

      <div className="h-3" />
      <div className="flex">
        <div className="w-0 flex-1">
          <UpcomingDeadlines deadlines={DEADLINES} />
        </div>
        <div className="w-3" />
        <div className="w-0 flex-1">
          <Messages data={DATA} />
        </div>
      </div>
    </div>
  );
}

function UpcomingDeadlines({ deadlines }) {
  const sortedDeadlines = deadlines.sort((a, b) => a.deadline - b.deadline);
  return (
    <div className="bg-gray-200 rounded-2xl p-4 ">
      <h1 className="text-center text-2xl">Upcoming Deadlines</h1>
      {sortedDeadlines.map((t, i) => (
        <div className=" bg-white flex justify-between border rounded p-1 m-1">
          <span>{format(t.deadline, "yyyy MMMM d")}</span>
          <div>{t.name}</div>
        </div>
      ))}
    </div>
  );
}
