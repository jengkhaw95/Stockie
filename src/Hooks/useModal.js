import { useState } from "react";

export default function useModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(false);
  const setModal = (c = false) => {
    setIsVisible(!isVisible);
    if (c) {
      setContent(c);
      setIsVisible(true);
    }
  };

  return [isVisible, setModal, content];
}
