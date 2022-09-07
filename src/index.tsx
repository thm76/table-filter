import { render } from "solid-js/web";
import { HopeProvider } from "@hope-ui/solid";
import { Router, Routes, Route, Navigate } from "@solidjs/router";
import { App } from "./App";
import { FilterInTableRow } from "./pages/FilterInTableRow";
import { DataProvider } from "./providers/DataProvider";

render(
  () => (
    <Router base="/">
      <HopeProvider>
        <DataProvider>
          <Routes>
            <Route path="/*" component={App}>
              <Route path="filter-in-table" component={FilterInTableRow} />
              <Route path="filter-component" component={FilterInTableRow} />
              <Route path="simple-filter" component={FilterInTableRow} />
              <Route path="*">
                <Navigate href="filter-in-table" />
              </Route>
            </Route>
          </Routes>
        </DataProvider>
      </HopeProvider>
    </Router>
  ),
  document.getElementById("app")!
);
