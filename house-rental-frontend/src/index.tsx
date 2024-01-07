import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./App.scss";

const rootElement = document.getElementById('app') as Element;
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    );