declare interface IReduxModule {
    path?: string;
    moduleName: string;
    order?: number;
    reducers?: object;
    initialState?: object;
    middlewares?: any[] | any;
    enhancers?: any;
    render?: (Component) => any;
    onStoreCreate?: (modules: IReduxModule[]) => void;
    [extraProps: string]: any;
}
