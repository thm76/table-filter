import { Component } from "solid-js";

export type GetFn<ObjType, FieldType> = (obj: ObjType) => FieldType | undefined;
export type FormatFn<FieldType> = (value: FieldType | undefined) => string;
export type FieldComponent<ObjType, FieldType> = Component<{
  obj: ObjType;
}>;

export type Field<ObjType, FieldType> = {
  label: string;
  get: GetFn<ObjType, FieldType>;
  format: FormatFn<FieldType>;
  component: FieldComponent<ObjType, FieldType>;
};
