import { useState } from "react";

export default function UseObjectState<T extends object>(
  initialState: T
): [T, (updateState: Partial<T>) => void] {
  const [objectState, setObjectState] = useState(initialState);

  const mergeState = (updateState: Partial<T>) => {
    setObjectState((prevState) => ({ ...prevState, ...updateState }));
  };

  return [objectState, mergeState];
}
