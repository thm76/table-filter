import {
  HopeComponent,
  Table as HopeTable,
  TableProps as HopeTableProps,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@hope-ui/solid";
import { splitProps, For } from "solid-js";
import { Field } from "../models/field.model";

type TableProps<T> = HopeTableProps & {
  fields: Field<T, any>[];
  data: T[];
};
export const Table: HopeComponent<"table", TableProps<any>> = (props) => {
  const [, otherProps] = splitProps(props, ["fields"]);
  return (
    <HopeTable {...otherProps}>
      <Thead>
        <Tr>
          <For each={props.fields}>{(field) => <Th>{field.label}</Th>}</For>
        </Tr>
      </Thead>
      <Tbody>
        <For each={props.data}>
          {(obj) => (
            <Tr>
              <For each={props.fields}>
                {(field) => <Td>{field.component({ obj })}</Td>}
              </For>
            </Tr>
          )}
        </For>
      </Tbody>
    </HopeTable>
  );
};
