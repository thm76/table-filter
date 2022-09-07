import { HighlightedText } from "../components/HighlightedText";
import { Field, FormatFn, GetFn } from "../models/field.model";

export function MakeIntegerField<ObjType>(
  label: string,
  get: GetFn<ObjType, number>
): Field<ObjType, number> {
  const format: FormatFn<number> = (value) =>
    typeof value === "number" && !isNaN(value) ? `${value}` : "";
  return {
    label,
    get,
    format,
    component: (props) => (
      <HighlightedText
        text={format(get(props.obj))}
        highlight={props.highlight}
      />
    ),
  };
}
