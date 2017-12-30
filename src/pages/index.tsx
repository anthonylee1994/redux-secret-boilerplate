import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./Home";
import AppRoutes from "./App";

export default class Router extends React.Component<undefined, undefined> {
    public render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home} />
                {...AppRoutes}
            </Switch>
        );
    }
}
