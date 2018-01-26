import { all } from "redux-saga/effects";
import "<%= kebabEntityName %>";

export const moduleName = "<%= kebabEntityName %>";

const reduxModule: IReduxModule = {
    moduleName,
    reducers: {
        [moduleName]: null,
    },
    saga: function* rootSaga() {
        yield all([]);
    },
};

export default reduxModule;
