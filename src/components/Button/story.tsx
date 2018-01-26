import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Button } from "./index";

storiesOf("TypeScript and Storybook", module)
    .add("Sample Widget", () => <Button />);
