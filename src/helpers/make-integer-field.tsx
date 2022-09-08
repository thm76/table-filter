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
    filterConfigs: [
      {
        label: "is more than",
        filterFn: (obj, data) => {
          const filter =
            typeof data === "string"
              ? parseInt(data as unknown as string)
              : data;
          if (isNaN(filter)) {
            return true;
          }
          if (typeof get(obj) !== "number" || isNaN(get(obj) as number)) {
            return true;
          }
          return (get(obj) as number) > filter;
        },
      },
      {
        label: "is less than",
        filterFn: (obj, data) => {
          const filter =
            typeof data === "string"
              ? parseInt(data as unknown as string)
              : data;
          if (isNaN(filter)) {
            return true;
          }
          if (typeof get(obj) !== "number" || isNaN(get(obj) as number)) {
            return true;
          }
          return (get(obj) as number) < filter;
        },
      },
    ],
  };
}
