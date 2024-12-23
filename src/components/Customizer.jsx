import React from "react";

const Customizer = ({ selectedComponent, onUpdate }) => {
  if (!selectedComponent)
    return (
      <div className="md:w-1/4 bg-gray-100 p-4">Select a component to edit</div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("styles.")) {
      const styleKey = name.split(".")[1];
      onUpdate({
        ...selectedComponent,
        styles: {
          ...selectedComponent.styles,
          [styleKey]: value,
        },
      });
    } else {
      onUpdate({
        ...selectedComponent,
        [name]: value,
      });
    }
  };

  return (
    <div className="md:w-1/4 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Customizer</h2>
      {selectedComponent.type === "text" && (
        <div>
          <label className="block mb-2">Text Content</label>
          <input
            type="text"
            name="defaultContent"
            value={selectedComponent.defaultContent}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      {selectedComponent.type === "image" && (
        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="src"
            value={selectedComponent.src || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <div>
        <label className="block mb-2">Font Size</label>
        <input
          type="text"
          name="styles.fontSize"
          value={selectedComponent.styles.fontSize || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Color</label>
        <input
          type="color"
          name="styles.color"
          value={selectedComponent.styles.color || "#000000"}
          onChange={handleChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Customizer;
