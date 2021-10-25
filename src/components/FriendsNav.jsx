import { useState } from "react";
import { Link } from "react-router-dom";

const ICONS = [
  { name: "Messages", image: "balloon-speech", link: "/messages" },
  { name: "Friends", image: "user", link: "/friends" }
  // { name: "Add Friends", image: "user_add", link: "/addFriends" }
];

export default function TopNav({ title }) {
  let [active, setActive] = useState("Friends");

  return (
    <div className="bg-white flex p-4 items-center text-2xl  ">
      <div className="text-gray-800 font-cute">{title}</div>
      <div className="flex-1"></div>

      {ICONS.map((m) => (
        <Link
          className=" mr-2"
          to={m.link}
          onClick={() => setActive(m.name)}
          key={m.name}
        >
          <NavItem item={m} active={active === m.name} />
        </Link>
      ))}
    </div>
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
    </div>
  );
}
