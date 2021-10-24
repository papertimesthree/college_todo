import { FaUser } from "react-icons/fa";

export default function Messages({ data = [] }) {
  return (
    <div className="bg-gray-200 rounded-2xl p-4">
      <h1 className="text-center text-2xl">Messages</h1>
      <div className="space-y-10">
        {data.map((v) => (
          <div key={v.id} className="flex space-x-4">
            <div
              className="w-14 h-14 rounded-full border-4 border-white shadow-lg"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/originals/79/ef/f8/79eff8b110f8dd68ac9af8bdd1f2ec04.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            ></div>
            <div>
              <div className="text-gray-500 mb-2">{v.from}, 7:50pm</div>
              <div
                className={`${
                  v.highlight ? "bg-blue-100" : "bg-white"
                } p-4 pr-10 text-gray-700 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-lg`}
              >
                {v.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
