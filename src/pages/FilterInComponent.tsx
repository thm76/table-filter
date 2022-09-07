import { Grid, Heading } from "@hope-ui/solid";
import { Component, createEffect, createMemo } from "solid-js";
import { useData } from "../providers/DataProvider";
import { Table } from "../components/Table";
import { Tile } from "../components/Tile";
import { TableFields } from "../models/table-fields";
import { createStore } from "solid-js/store";
import { FilterPanel, FilterStore } from "../components/FilterPanel";

export const FilterInComponent: Component = () => {
  const [filterStore, setFilterStore] = createStore<FilterStore>({
    filters: [],
  });

  const filters = createMemo(() => filterStore.filters.filter(($) => $.config));

  const filteredData = createMemo(() =>
    useData().filter((obj) =>
      filters().every((filter) => filter.config.filterFn(obj, filter.data[0]))
    )
  );

  return (
    <Grid gap="$3">
      <Heading level={2}>Option 3</Heading>
      <Tile>
        <FilterPanel
          fields={TableFields}
          store={filterStore}
          setStore={setFilterStore}
        />
        <Table fields={TableFields} data={filteredData()} />
      </Tile>
    </Grid>
  );
};
