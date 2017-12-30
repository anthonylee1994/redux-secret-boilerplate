import * as React from "react";
import { ConnectedRouter, routerReducer, routerMiddleware, push } from "react-router-redux";
import history from "../../history";

const reduxModule: IReduxModule = {
    moduleName: "react-router-redux",
    middlewares: [routerMiddleware(history)],
    // order: 999,
    reducers: {
        router: routerReducer,
    },
    render: (Component) => {
        return class ConnectedRouterHoc extends React.Component<undefined, undefined> {
            public render() {
                return <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>;
            }
        };
    },
};

export default reduxModule;
