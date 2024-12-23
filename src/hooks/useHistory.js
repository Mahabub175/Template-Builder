import { useState } from "react";

export const useHistory = () => {
  const [stack, setStack] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const push = (state) => {
    setStack((prevStack) => {
      const newStack = prevStack.slice(0, currentIndex + 1);
      newStack.push(state);
      setCurrentIndex(newStack.length - 1);
      return newStack;
    });
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return stack[currentIndex - 1];
    }
    return null;
  };

  const redo = () => {
    if (currentIndex < stack.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return stack[currentIndex + 1];
    }
    return null;
  };

  return {
    push,
    undo,
    redo,
  };
};
