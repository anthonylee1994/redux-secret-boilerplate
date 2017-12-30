import createSagaMiddleware from "redux-saga";
import { fork, all } from "redux-saga/effects";

const middleware = createSagaMiddleware();
const reduxModule: IReduxModule = {
    moduleName: "redux-saga",
    middlewares: [middleware],
    onStoreCreate: (modules) => {
        middleware.run(function* rootSaga() {
            yield all([
                ...modules.filter((m) => m.saga).map((m) => {
                    return fork(m.saga);
                }),
            ]);
        });
    },
};

export default reduxModule;
