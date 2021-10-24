import { useEffect, useState } from "react";
import Button from "../components/Button";
import Messages from "../components/Messages";
import {
  FaPeopleCarry,
  FaUser,
  FaUserAlt,
  FaUserFriends,
  FaUserInjured
} from "react-icons/fa";

const DATA = [
  { id: "asdsd1", from: "Bill", message: "Hello Buddy" },
  { id: "asdsd2", from: "Mary", message: "What's up?" },
  { id: "asdsd3", from: "William", message: "hola" },
  { id: "asdsdr4", from: "Joseph", message: "guten tag" }
];

const FRIENDS = [
  {
    id: "asdfs1",
    name: "Spike",
    source:
      "https://www.thathashtagshow.com/wp-content/uploads/2018/12/Cowboy-Bebop-Spike-Gun-1024x683.jpg"
  },
  {
    id: "asdfs2",
    name: "Jet",
    source:
      "https://i.pinimg.com/originals/79/ef/f8/79eff8b110f8dd68ac9af8bdd1f2ec04.jpg"
  },
  {
    id: "asdfs3",
    name: "Faye",
    source:
      "https://bleedingcool.com/wp-content/uploads/2019/04/cowboyb-1-1200x900.jpg"
  },
  {
    id: "asdfs4",
    name: "Edward",
    source:
      "https://i.pinimg.com/550x/cd/5f/06/cd5f06b30f601abd994edbb23e1fbf0a.jpg"
  },
  {
    id: "asdfs5",
    name: "Vicious",
    source:
      "https://hobbydb-production.s3.amazonaws.com/processed_uploads/subject_photo/subject_photo/image/43791/1538509590-31791-6689/al-lani-memanga-quotes-tumblr-com-there-is-nothing-to-21683517.png"
  },
  {
    id: "asdfs6",
    name: "Julia",
    source:
      "https://carboncostume.com/wordpress/wp-content/uploads/2017/11/cowboy-bebop-268.jpg"
  }
];

export default function Friends() {
  let [chatData, setChatData] = useState(DATA);
  useEffect(() => {
    if (1 === 1) return;
    setTimeout(() => {
      setChatData([
        ...chatData,
        { id: "asdsdr7", from: "Joseph", message: "guten tag", highlight: true }
      ]);
    }, 3000);

    setTimeout(() => {
      setChatData([
        ...chatData,
        {
          id: "asdsdr7",
          from: "Joseph",
          message: "guten tag",
          highlight: true
        },
        { id: "asdsdr7", from: "Joseph", message: "get out", highlight: true }
      ]);
    }, 4000);

    setTimeout(() => {
      setChatData([
        ...chatData,
        {
          id: "asdsdr7",
          from: "Joseph",
          message: "guten tag",
          highlight: true
        },
        { id: "asdsdr7", from: "Joseph", message: "get out", highlight: true },
        { id: "asdsdr7", from: "Joseph", message: "hey", highlight: true }
      ]);
    }, 5000);
  }, []);
  return (
    <div className="flex-1 flex flex-col">
      <TopNav />

      <div className="flex flex-col container p-4 flex-1">
        <div className="flex-1">
          <Messages data={chatData} />
        </div>
        {/* <div className="w-0 flex-1 ml-2">
          <FriendsView />
        </div> */}

        <div className="flex space-x-2">
          <input
            type="text"
            className="bg-white w-full px-2 py-3 text-lg rounded focus:outline-none"
          />
          <button className="d-bg-blue text-white px-2 rounded-xl">SEND</button>
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="bg-white flex container p-4 items-center text-2xl">
      <div className="text-gray-800 font-cute">My Friends</div>
      <div className="flex-1"></div>
      <FaUserAlt className="d-text-blue" />
      <FaUserFriends className="text-blue-400 text-3xl ml-3" />
    </div>
  );
}
function FriendsView() {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center space-x-1 mb-4">
        <h1 className="text-center text-2xl">My Friends</h1>
        <div className="text-blue-500 font-bold">{DATA.length}</div>
      </div>

      <div>
        {FRIENDS.map((v) => (
          <div
            key={v.id}
            className="font-bold text-gray-800 mb-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className="w-14 h-14 rounded-full border-4"
                style={{
                  backgroundImage: `url(${v.source})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
              <div className="ml-2">{v.name}</div>
            </div>
            <img src="img/icon_send_color.png" alt="send_icon" />
          </div>
        ))}
        <Button className="bg-green-300">Add Friend</Button>
      </div>
    </div>
  );
}
