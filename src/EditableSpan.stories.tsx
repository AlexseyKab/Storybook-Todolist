import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const callback = action('Task Changed')

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan value={'Start value'} onChange={callback}/>
}