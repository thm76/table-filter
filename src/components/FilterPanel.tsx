import {
  Button,
  Grid,
  HopeComponent,
  Input,
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
  Component,
  createMemo,
  createSignal,
  For,
  Show,
  splitProps,
} from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";
import { Field } from "../models/field.model";
import { Filter } from "../models/filter.model";

export type FilterStore = { filters: Filter<any, any, any>[] };
type FilterPanelProps<ObjType> = {
  fields: Field<ObjType, any>[];
  store: Store<FilterStore>;
  setStore: SetStoreFunction<FilterStore>;
};

export const FilterPanel: HopeComponent<"div", FilterPanelProps<any>> = (
  props
) => {
  const [, hopeProps] = splitProps(props, ["fields"]);

  const filterableFields = createMemo(() =>
    props.fields.filter(($) => $.filterConfigs.length > 0)
  );

  return (
    <Show when={filterableFields().length > 0} keyed>
      <Grid
        {...hopeProps}
        gridTemplateColumns="30px 1fr"
        gap="$2"
        alignItems="center"
      >
        <For each={props.store.filters}>
          {(filter, index) => (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  props.setStore("filters", ($) => [
                    ...$.slice(0, index()),
                    ...$.slice(index() + 1),
                  ]);
                }}
              >
                -
              </Button>
              <Grid gridTemplateColumns="1fr 1fr 1fr" gap="$2">
                <Select
                  value={filter.field?.label}
                  onChange={(value) => {
                    props.setStore(
                      "filters",
                      index(),
                      "field",
                      props.fields.find(($) => $.label === value)
                    );
                  }}
                >
                  <SelectTrigger>
                    <SelectPlaceholder>Select column</SelectPlaceholder>
                    <SelectValue />
                    <SelectIcon />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectListbox>
                      <For each={filterableFields()}>
                        {(field) => (
                          <SelectOption value={field.label}>
                            <SelectOptionText>{field.label}</SelectOptionText>
                            <SelectOptionIndicator />
                          </SelectOption>
                        )}
                      </For>
                    </SelectListbox>
                  </SelectContent>
                </Select>
                <Show when={filter.field !== undefined} keyed>
                  <Select
                    value={filter.config?.label}
                    onChange={(value) => {
                      props.setStore(
                        "filters",
                        index(),
                        "config",
                        (filter.field?.filterConfigs ?? []).find(
                          ($) => $.label === value
                        )
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectPlaceholder>Choose...</SelectPlaceholder>
                      <SelectValue />
                      <SelectIcon />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectListbox>
                        <For each={filter.field?.filterConfigs ?? []}>
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
                </Show>
                <Show when={filter.field !== undefined} keyed>
                  <Input
                    value={filter.data[0]()}
                    onInput={(e) => {
                      filter.data[1](e.currentTarget.value)
                    }}
                  />
                </Show>
              </Grid>
            </>
          )}
        </For>
        <Button
          onClick={() => {
            props.setStore("filters", ($) => [...$, { data: createSignal() }]);
          }}
          size="sm"
          variant="subtle"
        >
          +
        </Button>
      </Grid>
    </Show>
  );
};
