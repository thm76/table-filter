import { createSignal, Signal } from "solid-js";
import { Field } from "./field.model";
import { FilterConfig } from "./filter-config.model";

export type Filter<ObjType, FieldType, FilterData> = {
  field?: Field<ObjType, FieldType>;
  config?: FilterConfig<ObjType, FieldType, FilterData>;
  data: Signal<FilterData>;
};

