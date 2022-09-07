import { Accessor } from "solid-js";

export type FilterConfig<ObjType, FieldType> = {
  label: string;
  filterFn: (obj: ObjType, data: Accessor<FieldType>) => boolean;
};