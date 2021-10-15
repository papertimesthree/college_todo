import { useState } from "react";
import Button from "../components/Button";

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
    <div className="container mx-auto p-4">
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
    setMyCT([...myCT, colleges]);
  }

  return (
    <div>
      <div className="bg-gray-200 rounded-2xl p-4">
        <h2 className="text-xl">My Colleges</h2>
        {myCT.map((c, i) => (
          <div key={i} className="bg-blue-200 rounded-2xl p-4">
            {c}
          </div>
        ))}
      </div>
      <input
        type="search"
        placeholder="search"
        className="border m-2 p-2 rounded"
        onChange={(event) => setFilter(event.target.value)}
      />
      {selected.length} college{selected.length > 1 ? "s" : ""} selected
      <Button onClick={() => add()}>Add</Button>
      <div className="bg-gray-200 rounded-2xl p-4 grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {filtered.map((c) => (
          <div
            key={c.name}
            className={`${
              selected.includes(c.name) ? "bg-blue-400" : "bg-blue-200"
            } rounded p-4 m-1 cursor-pointer`}
            onClick={() => onSelect(c.name)}
          >
            <div>
              <img src={c.source} alt="College" height="80" width="80" />
            </div>
            <div>{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
