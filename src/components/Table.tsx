import {
  Grid,
  HopeComponent,
  HStack,
  IconButton,
  Input,
  Table as HopeTable,
  TableProps as HopeTableProps,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Select,
  SelectContent,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
} from "@hope-ui/solid";
import {
  splitProps,
  For,
  Show,
  createMemo,
  createSignal,
  createEffect,
} from "solid-js";
import { Fa } from "solid-fa";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Field } from "../models/field.model";
import { Filter } from "../models/filter.model";
import { createStore } from "solid-js/store";
import { FilterStore } from "./FilterPanel";

type TableProps<T> = HopeTableProps & {
  fields: Field<T, any>[];
  data: T[];
  highlight?: string;
  filterable?: boolean;
};
export const Table: HopeComponent<"table", TableProps<any>> = (props) => {
  const [, otherProps] = splitProps(props, ["fields"]);

  const [filterStore, setFilterStore] = createStore<FilterStore>({
    filters: [],
  });

  const filters = createMemo(() => filterStore.filters.filter(($) => $.config));

  const filteredData = createMemo(() =>
    props.data.filter((obj) =>
      filters().every((filter) => filter.config.filterFn(obj, filter.data[0]))
    )
  );

  createEffect(() => {
    console.log(
      filters().map(
        ($) => `${$.field?.label} ${$.config?.label} ${$.data[0]()}`
      )
    );
  });

  return (
    <HopeTable {...otherProps}>
      <Thead>
        <Tr>
          <For each={props.fields}>
            {(field) => {
              let filter: Filter<any, any, any> = filterStore.filters.find(
                ($) => $.field === field
              )!;
              if (!filter) {
                filter = { field, data: createSignal() };
                setFilterStore("filters", ($) => [...$, filter]);
              }

              return (
                <Th>
                  <HStack gap="$2" justifyContent="space-between">
                    {field.label}
                    <Show
                      when={props.filterable && field.filterConfigs.length > 0}
                    >
                      <Popover placement="bottom-end">
                        <PopoverTrigger
                          as={IconButton}
                          aria-label="Filter"
                          size="sm"
                          variant={
                            filter.config === undefined ? "neutral" : "subtle"
                          }
                          icon={<Fa icon={faFilter} />}
                        />
                        <PopoverContent zIndex={2}>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Grid p="$10 $2 $2 $2" gap="$2">
                              <Select
                                value={filter.config?.label ?? -1}
                                onChange={(value) => {
                                  const index = filterStore.filters.findIndex(
                                    ($) => $.field?.label === field.label
                                  );
                                  setFilterStore(
                                    "filters",
                                    index,
                                    "config",
                                    (filter.field?.filterConfigs ?? []).find(
                                      ($) => $.label === value
                                    )
                                  );
                                }}
                              >
                                <SelectTrigger>
                                  <SelectPlaceholder>
                                    Choose...
                                  </SelectPlaceholder>
                                  <SelectValue />
                                  <SelectIcon />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectListbox>
                                    <SelectOption value={-1}>
                                        <SelectOptionText>(All)</SelectOptionText>
                                      <SelectOptionIndicator />
                                    </SelectOption>
                                    <For
                                      each={filter.field?.filterConfigs ?? []}
                                    >
                                      {(config) => (
                                        <SelectOption value={config.label}>
                                          <SelectOptionText>
                                            {config.label}
                                          </SelectOptionText>
                                          <SelectOptionIndicator />
                                        </SelectOption>
                                      )}
                                    </For>
                                  </SelectListbox>
                                </SelectContent>
                              </Select>
                              <Input
                                value={filter.data[0]()}
                                onInput={(e) => {
                                  filter.data[1](e.currentTarget.value);
                                }}
                              />
                            </Grid>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Show>
                  </HStack>
                </Th>
              );
            }}
          </For>
        </Tr>
      </Thead>
      <Tbody>
        <For each={filteredData()}>
          {(obj) => (
            <Tr>
              <For each={props.fields}>
                {(field) => (
                  <Td>
                    {field.component({ obj, highlight: props.highlight })}
                  </Td>
                )}
              </For>
            </Tr>
          )}
        </For>
      </Tbody>
    </HopeTable>
  );
};
