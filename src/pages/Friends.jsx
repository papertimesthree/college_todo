import Button from "../components/Button";
import Messages from "../components/Messages";

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
      "https://cdn.vox-cdn.com/thumbor/7f8suGJNpPLdxV_RZ4_Xtk_L8nA=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22943072/Cowboy_Bebop_Vicious.jpg"
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
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "inline-block",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <img
                  className=""
                  style={{ width: "auto", height: "100%" }}
                  src={v.source}
                  alt="sd"
                />
              </div>
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
