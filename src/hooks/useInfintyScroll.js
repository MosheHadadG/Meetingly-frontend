import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const useInfintyScroll = ({ increasePage, options = null, skip = false }) => {
  const [lastElement, setLastElement] = useState(null);
  const dispatch = useDispatch();
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !skip) {
        dispatch(increasePage());
      }
    }, options)
  );

  useEffect(() => {
    if (skip) return;
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return { setLastElement };
};

export default useInfintyScroll;
