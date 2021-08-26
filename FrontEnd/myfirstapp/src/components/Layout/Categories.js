import React from "react";
import {Button, ButtonGroup} from "@material-ui/core";

function categories() {

return(
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
    </ButtonGroup>
);
}
export default categories;