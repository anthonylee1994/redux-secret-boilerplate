import { createReducer } from "redux-create-reducer";
import { Reducer } from "redux";
import * as snakeCase from "lodash/snakeCase";

const generateTypes = (handler, moduleName) => {
    const fh = Object.keys(handler).reduce(flattenHandler(handler), {});
    return Object.keys(fh).reduce((acc, key) =>
        ({ ...acc, [snakeCase(key)]: `@@${moduleName}/${snakeCase(key)}` }),
        {});
};
const flattenHandler = (handler, parentKey = "") => (acc, key) => {
    return (typeof handler[key] === "object") ? {
        ...acc,
        ...Object.keys(handler[key]).reduce(flattenHandler(handler[key], key), {}),
    } : {
            ...acc,
            [`${parentKey}_${snakeCase(key)}`]: handler[key],
        };
};

const assignAction = (handler, parentName, moduleName) => (acc, key) => {
    if (typeof handler[key] === "object") {
        return {
            ...acc,
            [key]: Object.keys(handler[key]).reduce(assignAction(handler[key], key, moduleName), {}),
        };
    }
    return {
        ...acc,
        [key]: (payload = {}) => ({ type: `@@${moduleName}/${parentName}_${snakeCase(key)}`, payload }),
    };
};

const generateAction = (handler, moduleName) => {
    return Object.keys(handler).reduce(assignAction(handler, "", moduleName), {});
};

const flattenReducerHandler = (handler, parentKey = "", moduleName) => (acc, key) => {
    return (typeof handler[key] === "object") ? {
        ...acc,
        ...Object.keys(handler[key]).reduce(flattenReducerHandler(handler[key], key, moduleName), {}),
    } : {
            ...acc,
            [`@@${moduleName}/${parentKey}_${snakeCase(key)}`]: handler[key],
        };
};
const generateReducer = (handler, moduleName, initialState) => {
    const frh = Object.keys(handler).reduce(flattenReducerHandler(handler, "", moduleName), {});
    return createReducer(initialState, frh);
};

export const createModule = <Actions, ActionTypes>(moduleName: string, initialState: any, handler: any): {
    moduleName: string,
    reducer: Reducer<any>,
    actions: Actions,
    types: ActionTypes,
    handler: any,
} => {
    return {
        moduleName,
        handler,
        reducer: generateReducer(handler, moduleName, initialState),
        actions: generateAction(handler, moduleName) as Actions,
        types: generateTypes(handler, moduleName) as ActionTypes,
    };
};
