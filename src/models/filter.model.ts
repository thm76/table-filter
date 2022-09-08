import { Field } from "./field.model";
import { FilterConfig } from "./filter-config.model";

export type Filter<ObjType, FieldType> = {
  field?: Field<ObjType, FieldType>;
  config?: FilterConfig<ObjType, FieldType>;
  data?: FieldType;
};
