import { render } from "solid-js/web";
import { HopeProvider } from "@hope-ui/solid";
import { Navigate, Router, Routes, Route } from "@solidjs/router";
import { App } from "./App";
import { FilterInTableRow } from "./pages/FilterInTableRow";
import { FilterInComponent } from "./pages/FilterInComponent";
import { DataProvider } from "./providers/DataProvider";
import { SimpleFilter } from "./pages/SimpleFilter";

render(
  () => (
    <Router base="/">
      <HopeProvider>
        <DataProvider>
          <Routes>
            <Route path="/*" component={App}>
              <Route path="/filter-in-table" component={FilterInTableRow} />
              <Route path="/filter-component" component={FilterInComponent} />
              <Route path="/simple-filter" component={SimpleFilter} />
              <Route path="/*">
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
