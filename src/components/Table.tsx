import {
  Button,
  FormControl,
  FormLabel,
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
  Index,
  Show,
  createMemo,
  createSignal,
} from "solid-js";
import { Fa } from "solid-fa";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Field } from "../models/field.model";
import { Filter } from "../models/filter.model";

type TableProps<T> = HopeTableProps & {
  fields: Field<T, any>[];
  data: T[];
  highlight?: string;
  filterMode?: "off" | "in-table" | "advanced" | "simple";
};

export const Table: HopeComponent<"table", TableProps<any>> = (props) => {
  const [, otherProps] = splitProps(props, ["fields", "data", "filterMode"]);

  const [filters, setFilters] = createSignal(
    props.filterMode === "in-table"
      ? props.fields.map((field) => ({ field } as Filter<any, any>))
      : props.filterMode === "simple"
      ? [
          {
            config: {
              label: "Filter",
              filterFn: (obj, data) =>
                props.fields.some((field) => {
                  const filterText = data ?? "";
                  if (filterText.trim() === "") {
                    return true;
                  }
                  const formatted = field.format(field.get(obj)).toLowerCase();
                  return formatted.indexOf(filterText.toLowerCase()) !== -1;
                }),
            },
          } as Filter<any, any>,
        ]
      : []
  );

  const filterableFields = props.fields.filter(
    ($) => $.filterConfigs.length > 0
  );

  const filteredData = createMemo(() =>
    props.data.filter((obj) =>
      filters()
        .filter(($) => $.config)
        .every((filter) => filter.config!.filterFn(obj, filter.data))
    )
  );

  return (
    <Grid gap="$2">
      <Show when={props.filterMode === "simple"} keyed>
        <FormControl>
          <FormLabel for="filter">{filters()[0].config!.label}</FormLabel>
          <Input
            id="filter"
            value={filters()[0].data}
            onInput={(e) => {
              setFilters(($) => [
                { ...$[0], data: e.currentTarget.value },
                ...$.slice(1),
              ]);
            }}
          />
        </FormControl>
      </Show>
      <Show when={props.filterMode === "advanced"} keyed>
        <Grid gridTemplateColumns="30px 1fr" gap="$2" alignItems="center">
          <Index each={filters()}>
            {(filter, index) => {
              console.log(
                `%cfilterable: [${filterableFields
                  .map(($) => `"${$.label}"`)
                  .join(", ")}]`,
                "color: red"
              );
              return (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setFilters(($) => [
                        ...$.slice(0, index),
                        ...$.slice(index + 1),
                      ]);
                    }}
                  >
                    -
                  </Button>
                  <Grid gridTemplateColumns="1fr 1fr 1fr" gap="$2">
                    <Select
                      value={filter().field?.label ?? -1}
                      onChange={(value) => {
                        const field = props.fields.find(
                          ($) => $.label === value
                        );
                        if (field) {
                          setFilters(($) => [
                            ...$.slice(0, index),
                            { ...$[index], field, config: undefined },
                            ...$.slice(index + 1),
                          ]);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectPlaceholder>Select column</SelectPlaceholder>
                        <SelectValue />
                        <SelectIcon />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectListbox>
                          <For each={filterableFields}>
                            {(field) => (
                              <SelectOption value={field.label}>
                                <SelectOptionText>
                                  {field.label}
                                </SelectOptionText>
                                <SelectOptionIndicator />
                              </SelectOption>
                            )}
                          </For>
                        </SelectListbox>
                      </SelectContent>
                    </Select>
                    <Show when={filter().field} keyed>
                      <Select
                        value={filter().config?.label ?? -1}
                        onChange={(value) => {
                          const config = filter().field!.filterConfigs.find(
                            ($) => $.label === value
                          );
                          if (config) {
                            setFilters(($) => [
                              ...$.slice(0, index),
                              { ...$[index], config },
                              ...$.slice(index + 1),
                            ]);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectPlaceholder>Choose...</SelectPlaceholder>
                          <SelectValue />
                          <SelectIcon />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectListbox>
                            <For each={filter().field!.filterConfigs}>
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
                        value={filter().data}
                        onInput={(e) => {
                          setFilters(($) => [
                            ...$.slice(0, index),
                            { ...$[index], data: e.currentTarget.value },
                            ...$.slice(index + 1),
                          ]);
                        }}
                      />
                    </Show>
                  </Grid>
                </>
              );
            }}
          </Index>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setFilters(($) => [...$, {}]);
            }}
          >
            +
          </Button>
        </Grid>
      </Show>
      <HopeTable {...otherProps}>
        <Thead>
          <Tr>
            <Index each={props.fields}>
              {(field, index) => {
                return (
                  <Th>
                    <HStack gap="$2" justifyContent="space-between">
                      {field().label}
                      <Show when={props.filterMode === "in-table"} keyed>
                        <Popover placement="bottom-end">
                          <PopoverTrigger
                            as={IconButton}
                            aria-label="Filter"
                            size="sm"
                            variant={
                              filters()[index].config === undefined
                                ? "neutral"
                                : "subtle"
                            }
                            icon={<Fa icon={faFilter} />}
                          />
                          <PopoverContent zIndex={2}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Grid p="$10 $2 $2 $2" gap="$2">
                                <Select
                                  value={filters()[index].config?.label ?? -1}
                                  onChange={(value) => {
                                    const config = field().filterConfigs.find(
                                      ($) => $.label === value
                                    );
                                    if (config) {
                                      setFilters(($) => [
                                        ...$.slice(0, index),
                                        { ...$[index], config },
                                        ...$.slice(index + 1),
                                      ]);
                                    }
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
                                        <SelectOptionText>
                                          (All)
                                        </SelectOptionText>
                                        <SelectOptionIndicator />
                                      </SelectOption>
                                      <Index each={field().filterConfigs}>
                                        {(config) => (
                                          <SelectOption value={config().label}>
                                            <SelectOptionText>
                                              {config().label}
                                            </SelectOptionText>
                                            <SelectOptionIndicator />
                                          </SelectOption>
                                        )}
                                      </Index>
                                    </SelectListbox>
                                  </SelectContent>
                                </Select>
                                <Input
                                  value={filters()[index].data}
                                  onInput={(e) => {
                                    setFilters(($) => [
                                      ...$.slice(0, index),
                                      {
                                        ...$[index],
                                        data: e.currentTarget.value,
                                      },
                                      ...$.slice(index + 1),
                                    ]);
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
            </Index>
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
    </Grid>
  );
};
