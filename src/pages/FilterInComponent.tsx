import { Grid, Heading } from "@hope-ui/solid";
import { Component} from "solid-js";
import { useData } from "../providers/DataProvider";
import { Table } from "../components/Table";
import { Tile } from "../components/Tile";
import { TableFields } from "../models/table-fields";

export const FilterInComponent: Component = () => (
  <Grid gap="$3">
    <Heading level={2}>Filters above table</Heading>
    <Tile>
      <Table fields={TableFields} data={useData()} filterMode="advanced" />
    </Tile>
  </Grid>
);
