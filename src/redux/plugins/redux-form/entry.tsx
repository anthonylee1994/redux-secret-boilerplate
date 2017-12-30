import { reducer } from "redux-form";

const reduxModule: IReduxModule = {
    moduleName: "redux-form",
    reducers: {
        form: reducer,
    },
};

export default reduxModule;
