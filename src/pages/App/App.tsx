import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/Button/index";
export class App extends React.Component<undefined, undefined> {
    public render() {
        return <div>
            <NavLink to="/">To Home</NavLink>
            <Button />
        </div>;
    }
}
