import { composeWithDevTools } from "redux-devtools-extension";

const reduxModule: IReduxModule = {
    moduleName: "redux-devtools-extension",
    order: -999,
    enhancers: [composeWithDevTools({})],
};

export default reduxModule;
