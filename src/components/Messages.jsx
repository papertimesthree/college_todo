import { format } from "date-fns";
import { isBefore } from "date-fns/esm";
import { useContext, useEffect, useState } from "react";
import TopNav from "../components/FriendsNav";
import AppContext from "../utils/app-context";
import { db } from "../utils/fb";

const DATA = [
  { id: "asdsd1", from: "Bill", message: "Hello Buddy" },
  { id: "asdsd2", from: "Mary", message: "What's up?" },
  { id: "asdsd3", from: "William", message: "hola" },
  { id: "asdsdr4", from: "Joseph", message: "guten tag" }
];

export default function Messages() {
  let [chatData, setChatData] = useState([]);
  let { user } = useContext(AppContext);

  async function onSubmit(event) {
    event.preventDefault();
    if (!user) return;

    let entry = {
      message: event.target.message.value,
      date: new Date(),
      uid: user.uid,
      name: user.displayName,
      photo: user.photoURL
    };
    event.target.reset();

    let { id } = await db.collection("chat").add(entry);
    // let doc = await db.collection("chat").doc(id).get();
    // setChatData([...chatData, doc]);
  }

  function loadChat() {
    db.collection("chat")
      .orderBy("date", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        setChatData(snapshot.docs);
      });
  }

  useEffect(() => loadChat(), []);

  return (
    <div className="flex-1">
      <TopNav />
      <div className="container mx-auto bg-gray-200 rounded-2xl p-4">
        <h1 className="text-center text-2xl">Messages</h1>
        <div className="flex flex-col-reverse">
          {chatData.map((v) => (
            <div key={v.id} className="flex space-x-4 my-5">
              <div
                className="w-14 h-14 rounded-full border-4 border-white shadow-lg"
                style={{
                  backgroundImage: `url('${v.data().photo}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
              <div>
                <div className="text-gray-500 mb-2">
                  {v.data().name},{" "}
                  {format(v.data().date.toDate(), "yyyy-MM-dd hh:mm:ss")}
                </div>
                <div
                  className={`bg-white p-4 pr-10 text-gray-700 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-lg`}
                >
                  {v.data().message}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ChatBox onSubmit={onSubmit} />
      </div>
    </div>
  );
}

function ChatBox({ onSubmit }) {
  let { user } = useContext(AppContext);
  return (
    <div className="flex bg-white rounded-xl p-2 mb-2">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={
            user ? "Write your message.." : "Please sign in to send messages"
          }
          name="message"
          className="bg-white w-full px-2 py-3 text-lg  focus:outline-none"
          disabled={!user}
        />
        <button
          className="d-bg-blue text-white p-4 rounded-xl"
          disabled={!user}
        >
          <img src="img/icon_send.png" alt="" className="" />
        </button>
      </form>
    </div>
  );
}
