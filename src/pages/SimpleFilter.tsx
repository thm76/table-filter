import { FormControl, FormLabel, Grid, Heading, Input } from "@hope-ui/solid";
import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { useData } from "../providers/DataProvider";
import { Table } from "../components/Table";
import { TableFields } from "../models/table-fields";

export const SimpleFilter: Component = () => {
  const data = useData();
  const [filterText, setFilterText] = createSignal("");

  createEffect(() => {
    console.log(`filter: "${filterText()}"`);
  });

  const filteredData = createMemo(() =>
    filterText().trim() === ""
      ? data
      : data.filter((obj) =>
          TableFields.some((field) => {
            const formatted = field.format(field.get(obj)).toLowerCase();
            return formatted.indexOf(filterText()) !== -1;
          })
        )
  );

  return (
    <Grid gap="$3">
      <Heading level={2}>Option 3</Heading>
      <FormControl>
        <FormLabel for="filter">Filter:</FormLabel>
        <Input
          id="filter"
          value={filterText()}
          onInput={(e) => {
            setFilterText(e.currentTarget.value);
          }}
        />
      </FormControl>
      <Table
        fields={TableFields}
        data={filteredData()}
        highlight={filterText()}
      />
    </Grid>
  );
};
