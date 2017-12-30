import * as React from "react";
import { NavLink } from "react-router-dom";
export class App extends React.Component<undefined, undefined> {
    public render() {
        return <NavLink to="/">To Home</NavLink>;
    }
}
