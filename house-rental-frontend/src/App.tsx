import React from "react";
import FormPropsTextFields from "./components/landlord";
import { CssBaseline } from "@mui/material";
import ButtonAppBar from "./components/navbar";

const App = () => {
    return (
    <CssBaseline>
        <ButtonAppBar></ButtonAppBar>
        <FormPropsTextFields/>
    </CssBaseline>
    );
};

export default App;