import { Box, Grid, Heading, HStack, TabList, Tabs, Tab } from "@hope-ui/solid";
import { Component, createEffect, createMemo, For } from "solid-js";
import { Outlet, useLocation, useNavigate } from "@solidjs/router";

type TabInfo = {
  path: string;
  label: string;
};

export const App: Component = () => {
  const tabInfos: TabInfo[] = [
    { path: "filter-in-table", label: "Option 1" },
    { path: "filter-component", label: "Option 2" },
    { path: "simple-filter", label: "Option 3" },
  ];
  const tabIndex = createMemo<number>(() => {
    const route = useLocation();

    return tabInfos.findIndex(($) => route.pathname.endsWith($.path)) ?? 0;
  });
  const navigate = useNavigate();

  return (
    <Grid gridTemplateRows="auto auto 1fr">
      <HStack as="header" h={60} bg="black" color="white" p="$5">
        <Heading level={1} size="xl">
          Table filters
        </Heading>
      </HStack>
      <Tabs
        index={tabIndex()}
        onChange={(index) => {
          navigate(tabInfos[index].path);
        }}
        variant="pills"
        p="$5"
      >
        <TabList>
          <For each={tabInfos}>{(info) => <Tab>{info.label}</Tab>}</For>
        </TabList>
      </Tabs>
      <Box p="$5">
        <Outlet />
      </Box>
    </Grid>
  );
};
