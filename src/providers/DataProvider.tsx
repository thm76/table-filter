import { ParentComponent, useContext } from "solid-js";
import { DataContext } from "./DataContext";

export const DataProvider: ParentComponent = (props) => {
  return (
    <DataContext.Provider
      value={[
        {
          name: "Billy",
          startYear: 2021,
        },
        {
          name: "Donna",
          startYear: 1983,
        },
        {
          name: "Jonathan",
          startYear: 1998,
        },
        {
          name: "Karen",
          startYear: 1998,
        },
        {
          name: "Thomas",
          startYear: 2021,
        },
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Duh!");
  }
  return context;
};
