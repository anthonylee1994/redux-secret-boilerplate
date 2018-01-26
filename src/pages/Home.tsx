import * as React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AsyncCounterAction } from "../redux/modules/asyncCounter/entry";

@connect((state) => {
    return { counter: state.asyncCounter.counter };
}, (d) => bindActionCreators({
    increment: AsyncCounterAction.increment.request,
    decrement: AsyncCounterAction.decrement.request,
}, d))
export class Home extends React.Component<any, undefined> {
    public render() {
        return <div>
            <NavLink to="/app">To App</NavLink>
            <button onClick={() => this.props.decrement()}>-</button>
            {this.props.counter}
            <button onClick={() => this.props.increment()}>+</button>
        </div>;
    }
}
