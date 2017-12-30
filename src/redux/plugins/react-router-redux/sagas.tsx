import { push } from "react-router-redux";
import { put } from "redux-saga/effects";

export function* redirect(url) {
    yield put(push(url));
}
