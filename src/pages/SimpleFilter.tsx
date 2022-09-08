import { Grid, Heading } from "@hope-ui/solid";
import { Component } from "solid-js";
import { useData } from "../providers/DataProvider";
import { Table } from "../components/Table";
import { Tile } from "../components/Tile";
import { TableFields } from "../models/table-fields";

export const SimpleFilter: Component = () => (
  <Grid gap="$3">
    <Heading level={2}>Simple text filter</Heading>
    <Tile>
      <Table
        fields={TableFields}
        data={useData()}
        filterMode="simple"
      />
    </Tile>
  </Grid>
);
