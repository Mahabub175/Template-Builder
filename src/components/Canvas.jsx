import React from "react";

const Canvas = ({ components, setComponents, onSelect }) => {
  const handleDrop = (e) => {
    const data = JSON.parse(e.dataTransfer.getData("component"));
    setComponents((prev) => [...prev, { ...data, id: Date.now().toString() }]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="lg:w-1/2 bg-gray-50 min-h-screen border border-dashed border-gray-300 p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {components.length === 0 ? (
        <p className="text-center text-gray-500">
          No components added yet. Drag and drop here to start building your
          template.
        </p>
      ) : (
        components.map((component, index) => (
          <div
            key={component.id}
            style={component.styles}
            className="mb-4 p-2 border rounded cursor-pointer"
            onClick={() => onSelect(index)}
          >
            {component.type === "text" && <p>{component.defaultContent}</p>}
            {component.type === "button" && (
              <button>{component.defaultContent}</button>
            )}
            {component.type === "image" && (
              <img src={component.defaultContent} alt="placeholder" />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Canvas;
