import { Field, FormatFn, GetFn } from "../models/field.model";

export function MakeTextField<ObjType>(
  label: string,
  get: GetFn<ObjType, string>
): Field<ObjType, string> {
    const format: FormatFn<string> = (value: string|undefined) => value ?? ""
    return {
        label,
        get,
        format,
        component: (props) => format(get(props.obj))
    }
}
