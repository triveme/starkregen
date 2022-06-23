import { useEffect } from "react";

// scrolls up on load
export function ScrollContainer(props) {
  const { children } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
