import { FaUser } from "react-icons/fa";

export default function Messages({ data = [] }) {
  return (
    <div className="bg-gray-200 rounded-2xl p-4">
      <h1 className="text-center text-2xl">Messages</h1>
      <div>
        {data.map((v) => (
          <div key={v.id} className="flex">
            <div className="font-bold text-gray-800 mr-3 flex items-center">
              <FaUser className="mr-1" />
              {v.from}
            </div>
            <div>{v.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
