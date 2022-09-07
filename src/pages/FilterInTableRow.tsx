import { Component } from "solid-js";
import { Grid, Heading } from "@hope-ui/solid";
import { Tile } from "../components/Tile";
import { Table } from "../components/Table";
import { TableFields } from "../models/table-fields";
import { useData } from "../providers/DataProvider";

export const FilterInTableRow: Component = () => (
  <Grid gap="$3">
    <Heading level={2}>Option 1</Heading>
    <Tile>
      <Table fields={TableFields} data={useData()} />
    </Tile>
  </Grid>
);
