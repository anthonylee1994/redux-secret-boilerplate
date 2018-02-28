import { applyMiddleware, createStore } from "redux";
import { enhancer, initialState, reducer, middlewares, onStoreCreate, importModules, reducerEnhancers } from "./index";

export function configureStore() {
    const store = createStore(reducerEnhancers ? reducerEnhancers(reducer) : reducer, initialState, enhancer(applyMiddleware(...middlewares)));
    onStoreCreate && onStoreCreate.forEach((o) => {
        typeof o === "function" && o(importModules);
    });

    if (module.hot) {
        module.hot.accept("./index", () => {
            store.replaceReducer(require("./index").reducer);
        });
    }

    return store;
}

export default configureStore();
