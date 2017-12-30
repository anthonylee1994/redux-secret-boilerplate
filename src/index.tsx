import "./utils/polyfills";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import store from "./redux/store";
import { enhanceComponent } from "./redux";
import history from "./redux/history";
import Router from "./pages";
import { createModule } from "./utils/createModule";

const render = (Component: React.ComponentType) => {
    const EnhancedComponent = enhanceComponent(Component);
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <EnhancedComponent />
            </Provider>
        </AppContainer>,
        document.getElementById("root") as HTMLElement,
    );
};

render(Router);

if (module.hot) {
    module.hot.accept("./pages", () => render(require("./pages").default));
}
