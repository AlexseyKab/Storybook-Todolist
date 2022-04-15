import AppWithRedux from "./AppWithRedux";
import React from 'react'
import {Provider} from "react-redux";
import {store} from "./state/store";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux
}

export const AppWithReduxBaseExample = (props: any) => {
    return <Provider store={store}>
        <AppWithRedux/>
    </Provider>
}