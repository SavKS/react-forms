import { ReactNode } from 'react';

import Form from '../../Form';
import useFormErrorsAsArray from '../../hooks/useFormErrorsAsArray';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type ConsumeErrorsAsArrayProps = {
    form?: Form,
    path: string | string[],
    config?: {
        isRoot?: boolean
    },
    children: (errors: string[]) => ReactNode
};

export default function ConsumeFormErrorsAsArray(props: ConsumeErrorsAsArrayProps) {
    const form = usePassedOrContextualForm(props.form);

    const value = useFormErrorsAsArray(form, props.path, props.config);

    return (<>{ props.children(value) }</>);
}
