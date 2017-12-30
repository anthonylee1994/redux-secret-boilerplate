import { takeLatest, all, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { createModule } from "../../../utils/createModule";
import { AnyAction } from "redux";

export const moduleName = "asyncCounter";

export interface IAsyncCounterType {
    increment_request: string;
    increment_success: string;
    increment_failure: string;
    decrement_request: string;
    decrement_success: string;
    decrement_failure: string;
    set: string;
}

export interface IAsyncCounterAction {
    increment: {
        request: () => AnyAction;
        success: () => AnyAction;
        failure: () => AnyAction;
    };
    decrement: {
        request: () => AnyAction;
        success: () => AnyAction;
        failure: () => AnyAction;
    };
    set: () => AnyAction;
}

const asyncCounter = createModule<IAsyncCounterAction, IAsyncCounterType>(moduleName, { isLoading: false, counter: 0 }, {
    increment: {
        request: (state, action) => ({ ...state, isLoading: true }),
        success: (state, action) => ({ ...state, isLoading: false, counter: ++state.counter }),
        failure: (state, action) => ({ ...state, isLoading: false }),
    },
    decrement: {
        request: (state, action) => ({ ...state, isLoading: true }),
        success: (state, action) => ({ ...state, isLoading: false, counter: --state.counter }),
        failure: (state, action) => ({ ...state, isLoading: false }),
    },
    set: (state, action) => ({ ...state, counter: action.payload.counter }),
});

export const AsyncCounterAction = asyncCounter.actions;
export const AsyncCounterActionType = asyncCounter.types;
export const AsyncCounterHandler = asyncCounter.handler;

export default {
    moduleName,
    reducers: {
        [moduleName]: asyncCounter.reducer,
    },
    saga: function* rootSaga() {
        yield all([
            takeLatest(AsyncCounterActionType.decrement_request, function* listenDecrement() {
                yield delay(500);
                yield put(AsyncCounterAction.decrement.success());
            }),
            takeLatest(AsyncCounterActionType.increment_request, function* listenDecrement() {
                yield delay(500);
                yield put(AsyncCounterAction.increment.success());
            }),
        ]);
    },
};
