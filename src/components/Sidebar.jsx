import React from "react";
import { componentsList } from "../assets/data/componentsData";

const Sidebar = ({ onDragStart }) => {
  return (
    <div className="lg:w-1/4 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Components</h2>
      {componentsList.map((component) => (
        <div
          key={component.id}
          className="p-2 mb-2 bg-white shadow-sm cursor-pointer rounded hover:bg-gray-200"
          draggable
          onDragStart={(e) => onDragStart(e, component)}
        >
          {component.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
