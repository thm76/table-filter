import { MakeTextField } from "../helpers/make-text-field";
import { TableData } from "./table-data.model";
import { MakeIntegerField } from "../helpers/make-integer-field";

export const TableFields = [
  MakeTextField<TableData>("Name", ($) => $.name),
  MakeIntegerField<TableData>("Start year", ($) => $.startYear),
];
