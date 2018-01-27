import { createModule } from "../createModule";
import * as snakeCase from "lodash/snakeCase";
describe("createModule unit test", () => {
    const counter = createModule<any, any>("counter", { isLoading: false, counter: 0 }, {
        increment: {
            request: (state, action) => ({ ...state, isLoading: true }),
            success: (state, action) => ({ ...state, isLoading: false, counter: ++state.counter }),
            failure: (state, action) => ({ ...state, isLoading: false }),
        },
        decreMent: {
            request: (state, action) => ({ ...state, isLoading: true }),
            success: (state, action) => ({ ...state, isLoading: false, counter: --state.counter }),
            failure: (state, action) => ({ ...state, isLoading: false }),
        },
        set: (state, action) => ({ ...state, counter: action.payload.counter }),
    });

    it("should return correct number of keys", () => {
        expect(counter.types).toHaveProperty("decre_ment_success");
        expect(Object.keys(counter.types).length).toEqual(7);
    });

    it("should generate the correct actions object", () => {
        expect(counter.actions.increment.request()).toEqual({ type: "@@counter/increment_request", payload: {} });
        expect(Object.keys(counter.actions).length).toEqual(3);
        expect(Object.keys(counter.actions.increment).length).toEqual(3);
        expect(Object.keys(counter.actions.decreMent).length).toEqual(3);
        expect(typeof counter.actions.set).toEqual("function");
    });

    it("should generate correct reducer", () => {
        expect(counter.reducer({ isLoading: false, counter: 0 }, counter.actions.increment.request())).toEqual({ isLoading: true, counter: 0 });
        expect(counter.reducer({ isLoading: true, counter: 0 }, counter.actions.increment.success())).toEqual({ isLoading: false, counter: 1 });
        expect(counter.reducer({ isLoading: true, counter: 0 }, counter.actions.increment.failure())).toEqual({ isLoading: false, counter: 0 });
        expect(counter.reducer({ isLoading: false, counter: 0 }, counter.actions.set({ counter: 99 }))).toEqual({ isLoading: false, counter: 99 });
    });

});
