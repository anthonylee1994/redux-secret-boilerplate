import { combineReducers, compose } from "redux";
import * as flatten from "lodash/flatten";

function getAllModules(): IReduxModule[] {
    const r = require.context("./", true, /^.*entry.tsx$/);
    return r.keys()
        .reduce((acc, curr) => {
            const m = r(curr).default;
            if (m && m.moduleName) {
                acc.push({
                    ...m,
                    path: curr,
                });
            }
            return acc;
        }, [])
        .sort((a, b) => { // sort modules
            return (a.order ? a.order : 0) - (b.order ? b.order : 0);
        });
}

export const importModules: IReduxModule[] = getAllModules();

const getArrayByKey = (key): any[] => {
    return importModules.reduce((acc, m) => {
        m[key] && acc.push(m[key]);
        return acc;
    }, []);
};

export const middlewares: any[] = flatten(getArrayByKey("middlewares"));
export const enhancer = compose(...flatten(getArrayByKey("enhancers")));
export const reducer: any = combineReducers(getArrayByKey("reducers").reduce((acc, r) => ({ ...acc, ...r }), {}));
export const initialState: any = getArrayByKey("initialState").reduce((acc, r) => ({ ...acc, ...r }), {});
export const enhanceComponent = compose(...getArrayByKey("render"));
export const onStoreCreate = getArrayByKey("onStoreCreate");
