import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const COLLEGES = [
  {
    name: "Harvard",
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Harvard_University_shield.png/150px-Harvard_University_shield.png"
  },
  {
    name: "Yale",
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/220px-Yale_University_Shield_1.svg.png"
  },
  {
    name: "MIT",
    source:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/150px-MIT_Seal.svg.png"
  },
  {
    name: "UCLA",
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/150px-The_University_of_California_UCLA.svg.png"
  },
  {
    name: "Duke",
    source:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Duke_University_Crest.svg/150px-Duke_University_Crest.svg.png"
  },
  {
    name: "Harvey Mudd",
    source:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Harvey_Mudd_College_seal.svg/200px-Harvey_Mudd_College_seal.svg.png"
  },
  {
    name: "Johns Hopkins University",
    source:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Johns_Hopkins_University%27s_Academic_Seal.svg/130px-Johns_Hopkins_University%27s_Academic_Seal.svg.png"
  },
  {
    name: "KAIST",
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/KAIST_logo.svg/175px-KAIST_logo.svg.png"
  },
  {
    name: "UCB",
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/150px-Seal_of_University_of_California%2C_Berkeley.svg.png"
  }
];

export default function MyColleges() {
  return (
    <div
      className="container mx-auto p-4"
      style={{ backgroundColor: "rgb(231, 231, 232)" }}
    >
      <div className="h-3" />
      <CollegeList />
    </div>
  );
}

function CollegeList() {
  let [filter, setFilter] = useState("");
  let [selected, setSelected] = useState([]);
  let [myCT, setMyCT] = useState([]);

  let filtered = COLLEGES;
  if (filter.length > 0) {
    filtered = COLLEGES.filter((v) =>
      v.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function onSelect(name) {
    if (selected.includes(name)) {
      setSelected(selected.filter((v) => v !== name));
    } else {
      setSelected([...selected, name]);
    }
  }

  function add() {
    let colleges = [...selected];
    let myList = [...myCT].concat(colleges);
    let unique = [...new Set(myList)];
    setSelected([]);
    setMyCT(unique);
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-4">
        <h2 className="text-2xl d-text-darkgray font-cute">My Colleges</h2>
        <div className="bg-gray-200 text-gray-600 m-2 p-2 ml-0.5 rounded text-xl flex items-center space-x-3">
          <FaSearch />
          <input
            type="search"
            placeholder="Johns Hopkins University"
            onChange={(event) => setFilter(event.target.value)}
            className="bg-gray-200 text-gray-600 flex-1 focus:outline-none"
          />
        </div>
        <div className="flex justify-end items-center font-cute text-gray-500 space-x-2">
          <span className="d-text-blue">{selected.length}</span>
          <div>college{selected.length > 1 ? "s" : ""} selected</div>
          <button
            className="d-bg-blue text-white px-4 rounded-2xl py-1 font-cute"
            onClick={() => add()}
          >
            Save
          </button>
        </div>
        {myCT.map((c, i) => (
          <div key={i} className="font-cute  p-4">
            {c}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 mt-6 font-cute text-gray-600">
        {filtered.map((c) => (
          <div
            key={c.name}
            className={`${
              selected.includes(c.name)
                ? "font-medium text-lg text-blue-500"
                : "font-medium text-lg "
            } rounded p-2 m-1 cursor-pointer`}
            onClick={() => onSelect(c.name)}
          >
            <div className="flex justify-between">
              {c.name}
              {selected.includes(c.name) ? (
                <img
                  className="h-5 "
                  src="img/icon_checked_circle.png"
                  alt="checkmark"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
