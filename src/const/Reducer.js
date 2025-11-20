export const reducer = (prevState, newState) => {
  if (typeof newState === "object") return { ...prevState, ...newState };
  if (typeof newState === "function") return newState(prevState);
  return prevState;
};
