import { createContext } from "solid-js";
import { TableData } from "../models/table-data.model";

export const DataContext = createContext<TableData[]>();
