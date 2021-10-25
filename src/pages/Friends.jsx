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

const FRIENDS = [
  {
    id: "asdfs1",
    name: "Spike",
    source:
      "https://anime.international/wp-content/uploads/2021/06/Spike-Cowboy-Bebop.jpg"
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
  return (
    <div className="flex-1 flex flex-col">
      <TopNav />
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-0 flex-1 ml-2">
            <FriendsView />
          </div>
        </div>
      </div>
    </div>
  );
}

function FriendsView() {
  let [showAddForm, setShowAddForm] = useState(false);
  let { user } = useContext(AppContext);

  let [friends, setFriends] = useState([]);
  let [invites, setInvites] = useState([]);
  let [invited, setInvited] = useState([]);

  async function loadFriends() {
    db.collection("friends")
      .where("uid", "==", user.uid)
      .get()
      .then((snapshot) => setFriends(snapshot.docs));
  }

  useEffect(() => {
    if (user) {
      loadFriends();

      db.collection("friend-request")
        .where("user1", "==", user.uid)
        .get()
        .then((snapshot) => setInvites(snapshot.docs));

      db.collection("friend-request")
        .where("user2_email", "==", user.email)
        .get()
        .then((snapshot) => setInvited(snapshot.docs));
    }
  }, [user]);

  function addFriend(event) {
    event.preventDefault();

    let entry = {
      user1: user.uid,
      user1_name: user.displayName,
      user2_email: event.target.email.value
    };

    let { id } = db.collection("friend-request").add(entry);
    let doc = { id: id, data: () => entry };
    setInvites([...invites, doc]);
  }

  function accept(id) {
    let entryIndex = invited.findIndex((v) => v.id === id);
    let entry = invited[entryIndex];

    db.collection("friends").add({
      uid: user.uid,
      friend_name: entry.data().user1_name
    });

    db.collection("friends").add({
      uid: entry.data().user1,
      friend_name: user.displayName
    });

    setInvited((prev) => prev.filter((v) => v.id !== id));
    db.collection("friend-request").doc(id).delete();

    loadFriends();
  }

  function decline(id) {
    setInvited((prev) => prev.filter((v) => v.id !== id));
    db.collection("friend-request").doc(id).delete();
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-4">
        <div className="flex items-center space-x-1 mb-4">
          <h3 className="font-cute d-text-gray">Friends</h3>
          <div className="text-blue-500 font-bold">{FRIENDS.length}</div>
        </div>

        <div>
          {FRIENDS.map((v) => (
            <div
              key={v.id}
              className="font-bold text-gray-800 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center ">
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
              <img
                src="img/icon_send_color.png"
                alt="send_icon"
                className="mr-2 mt-2"
              />
            </div>
          ))}

          {friends.map((v) => (
            <div
              key={v.id}
              className="font-bold text-gray-800 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center ">
                <div className="w-14 h-14 rounded-full border-4 bg-green-700 text-white flex justify-center items-center text-3xl">
                  {v.data().friend_name[0]}
                </div>
                <div className="ml-2">{v.data().friend_name}</div>
              </div>
              <img
                src="img/icon_send_color.png"
                alt="send_icon"
                className="mr-2 mt-2"
              />
            </div>
          ))}

          {invites.map((v) => (
            <div
              key={v.id}
              className="font-bold text-gray-800 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center ">
                <div className="w-14 h-14 rounded-full bg-pink-500 border-4 text-white flex justify-center items-center text-3xl">
                  {v.data().user2_email[0].toUpperCase()}
                </div>
                <div className="ml-2">{v.data().user2_email}</div>
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
          ))}

          {invited.map((v) => (
            <div
              key={v.id}
              className="font-bold text-gray-800 mb-4 flex items-center justify-between"
            >
              <div className="flex items-center ">
                <div className="w-14 h-14 rounded-full bg-pink-500 border-4 text-white flex justify-center items-center text-3xl">
                  {v.data().user1_name[0].toUpperCase()}
                </div>
                <div className="ml-2">{v.data().user1_name} invited you</div>
              </div>
              <div className="text-gray-600 space-x-2 text-sm">
                <button
                  className="d-bg-blue px-4 py-1 rounded text-white"
                  onClick={() => accept(v.id)}
                >
                  Accept
                </button>
                <button
                  className="d-bg-red px-4 py-1 rounded text-white"
                  onClick={() => decline(v.id)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {user && (
        <div className="text-right mt-4">
          <button
            className="d-bg-blue px-4 py-1 rounded text-white"
            onClick={() => setShowAddForm(true)}
          >
            ADD
          </button>
        </div>
      )}

      {showAddForm && (
        <AddForm close={() => setShowAddForm(false)} add={addFriend} />
      )}
    </div>
  );
}

function AddForm({ close, add }) {
  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center"
      style={{
        background: `rgba(0, 0, 0, 0.5)`
      }}
      onClick={close}
    >
      <form
        className="bg-white p-4 rounded container"
        onClick={(event) => event.stopPropagation()}
        onSubmit={add}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="enter your friends email address"
            className="bg-gray-200 rounded px-4 py-1 flex-1"
            name="email"
          />
          <button className="d-bg-blue text-white px-4 py-1 rounded ml-2">
            Invite
          </button>
        </div>
      </form>
    </div>
  );
}
