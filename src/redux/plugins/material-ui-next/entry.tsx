import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui-next/styles";

const theme = createMuiTheme();

const reduxModule: IReduxModule = {
    moduleName: "material-ui-next",
    order: -996,
    render: (Component) => {
        return class MaterialUiNextHoc extends React.Component<undefined, undefined> {
            public render() {
                return <MuiThemeProvider theme={theme}>
                    <Component />
                </MuiThemeProvider >;
            }
        };
    },
};

export default reduxModule;
