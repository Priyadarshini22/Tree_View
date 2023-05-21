import React, { useLayoutEffect, useState } from "react";
import "./styles.css";
import { FaBars, FaTimes } from 'react-icons/fa';
import { links } from './data';

import Tree from "./Tree/Tree";
import { useGlobalContext } from "./context";
const structure = [
  {
    type: "container",
    name: "Box 1",
    files: [
      {
        type: "leaf",
        name: "Box 1.1",
        files: [
          { type: "leaf", name: "Leaf 1" },
          { type: "leaf", name: "Leaf 2" },
          { type: "leaf", name: "Leaf 3" }
        ]
      },
      {
        type: "container",
        name: "Box 1.2",
        files: [
          { type: "leaf", name: "Leaf 1" },
          { type: "leaf", name: "Leaf 2" }
        ]
      },
      { type: "leaf", name: "Leaf 1" },
      { type: "leaf", name: "Leaf 2" }
    ]
  },
  {
    type: "container",
    name: "Box 2",
    files: [
      {
        type: "leaf",
        name: "leaf 1"
      }
    ]
  },
  { type: "leaf", name: "Leaf 1" }
];

export default function App() {
  let [data, setData] = useState(structure);
 console.log(data)
  const handleClick = props => {
  
  };
  const handleUpdate = state => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function(key, value) {
        if (key === "parent" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  useLayoutEffect(() => {
    console.log(data)
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree"));
      if (savedStructure) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  const { isSidebarOpen, closeSidebar,openSidebar } = useGlobalContext();
  return (
    <>
    <button onClick={openSidebar} className='sidebar-button'><FaBars/></button>

    <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
    <div className='sidebar-header'>
    <ul className='social'>
      {links.map((link) => {
        const { id, url, text, icon } = link;
        return (
          <li key={id}>
            <a href={url}>
              {text}
            </a>
          </li>
        );
      })}
    </ul>
 
      <button className='close-btn' onClick={closeSidebar}>
        <FaTimes />
      </button>
    </div>
    <div className="App">
      <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    </div>
    </aside>
    </>
  );
}
