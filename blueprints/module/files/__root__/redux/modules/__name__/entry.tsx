import { takeLatest, all, put } from "redux-saga/effects";
import { AnyAction } from "redux";
import { createModule } from "../../../utils/createModule";

export const moduleName = "<%= kebabEntityName %>";

export interface I<%= pascalEntityName %>Type {
    foo_request: string;
    foo_success: string;
    foo_failure: string;
}

export interface I<%= pascalEntityName %>Action {
    foo: {
        request: () => AnyAction;
        success: () => AnyAction;
        failure: () => AnyAction;
    };
}

const <%= camelEntityName %> = createModule<I<%= pascalEntityName %>Action, I<%= pascalEntityName %>Type>(moduleName, { isFoo: true}, {
    foo: {
        request: (state, action) => ({ ...state, isFoo: true }),
        success: (state, action) => ({ ...state, isFoo: false }),
        failure: (state, action) => ({ ...state, isFoo: true }),
    },
});

export const <%= pascalEntityName %>Action = <%= camelEntityName %>.actions;
export const <%= pascalEntityName %>ActionType = <%= camelEntityName %>.types;
export const <%= pascalEntityName %>Handler = <%= camelEntityName %>.handler;

const reduxModule: IReduxModule = {
    moduleName,
    reducers: {
        [moduleName]: <%= camelEntityName %>.reducer,
    },
    saga: function* rootSaga() {
        yield all([
            takeLatest(<%= pascalEntityName %>ActionType.foo_request, function* listen() {
                yield put(<%= pascalEntityName %>Action.foo.success());
            }),
        ]);
    },
};

export default reduxModule;
