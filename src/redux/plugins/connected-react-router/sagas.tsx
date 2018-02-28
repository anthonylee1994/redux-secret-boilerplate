import { push, LOCATION_CHANGE } from "connected-react-router";
import { put, select, take, call } from "redux-saga/effects";

export function* redirect(url) {
    yield put(push(url));
}

export function* onLocationChange(url, func, triggerOnStartUp = true) {
    let previousStore = null;
    let currentStore = yield select((s: any) => s.router.location);
    while (true) {
        const action = yield take(LOCATION_CHANGE);
        previousStore = currentStore;
        currentStore = yield select((s: any) => s.router.location);
        if (action.payload.pathname === url && (triggerOnStartUp || previousStore !== null)) {
            yield call(func, action);
        }
    }
}
