import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import Customizer from "./Customizer";
import { useHistory } from "../hooks/useHistory";

const EmailBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { push, undo, redo } = useHistory();

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("emailTemplate"));
    if (savedState) {
      setComponents(savedState);
      push(savedState);
    }
  }, []);

  useEffect(() => {
    if (components.length > 0) {
      localStorage.setItem("emailTemplate", JSON.stringify(components));
      push(components);
    }
  }, [components]);

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData("component", JSON.stringify(component));
  };

  const handleComponentUpdate = (updates) => {
    if (selectedIndex === null) return;
    const updatedComponents = [...components];
    updatedComponents[selectedIndex] = {
      ...updatedComponents[selectedIndex],
      ...updates,
    };
    setComponents(updatedComponents);
  };

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setComponents(previousState);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setComponents(nextState);
    }
  };
  const handleClear = () => {
    localStorage.removeItem("emailTemplate");
    setComponents([]);
  };

  return (
    <div className="flex flex-col gap-10 md:gap-0 md:flex-row">
      <Sidebar onDragStart={handleDragStart} />
      <Canvas
        components={components}
        setComponents={setComponents}
        onSelect={setSelectedIndex}
      />
      <Customizer
        selectedComponent={components[selectedIndex] || null}
        onUpdate={handleComponentUpdate}
      />
      <div className="flex justify-center items-center md:absolute bottom-4 right-4 space-x-2">
        <button onClick={handleUndo} className="px-4 py-2 bg-gray-300 rounded">
          Undo
        </button>
        <button onClick={handleRedo} className="px-4 py-2 bg-gray-300 rounded">
          Redo
        </button>
        <button onClick={handleClear} className="px-4 py-2 bg-gray-300 rounded">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default EmailBuilder;
