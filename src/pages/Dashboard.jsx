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
      <div className="flex justify-between">
        <div className="font-mono text-2xl">Achieved</div>
        <div>1 ToDo</div>
      </div>

      <ProgressBar progressPercentage={75} />
    </div>
  );
}

function UpcomingDeadlines({ deadlines }) {
  const sortedDeadlines = deadlines.sort((a, b) => a.deadline - b.deadline);
  return (
    <div className="bg-white rounded-2xl p-4 ">
      <h1 className="font-sans text-2xl mb-4">Upcoming Deadlines</h1>
      {sortedDeadlines.map((t, i) => (
        <div className=" bg-white border rounded p-1 m-1">
          <div className="flex text-sm">
            <img
              src="img/icon_exclamation-mark.png"
              alt="exclamation mark"
              className=""
            />
            <span>{format(t.deadline, "yyyy MMMM d")}</span>
          </div>
          <div className="ml-6">{t.name}</div>
        </div>
      ))}
    </div>
  );
}
