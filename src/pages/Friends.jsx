import Button from "../components/Button";
import Messages from "../components/Messages";

const DATA = [
  { id: "asdsd1", from: "Bill", message: "Hello Buddy" },
  { id: "asdsd2", from: "Mary", message: "What's up?" },
  { id: "asdsd3", from: "William", message: "hola" },
  { id: "asdsdr4", from: "Joseph", message: "guten tag" }
];

const FRIENDS = [
  { id: "asdfs1", name: "John" },
  { id: "asdfs2", name: "Bart" },
  { id: "asdfs3", name: "James" },
  { id: "asdfs4", name: "Bob" }
];

export default function Friends() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-0 flex-1">
          <Messages data={DATA} />
        </div>
        <div className="w-0 flex-1 ml-2">
          <FriendsView />
        </div>
      </div>
    </div>
  );
}

function FriendsView() {
  return (
    <div className="bg-gray-200 rounded-2xl p-4">
      <h1 className="text-center text-2xl">My Friends</h1>
      <div>
        {FRIENDS.map((v) => (
          <div key={v.id} className="flex">
            <div className="font-bold text-gray-800 mr-3 flex items-center">
              {v.name}
            </div>
          </div>
        ))}
        <Button className="bg-green-300">Add Friend</Button>
      </div>
    </div>
  );
}
