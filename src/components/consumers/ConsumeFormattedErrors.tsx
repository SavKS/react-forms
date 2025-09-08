import { ReactNode } from 'react';

import Form from '../../Form';
import useFormFormattedErrors from '../../hooks/useFormFormattedErrors';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type ConsumeFormErrorsProps = {
    form?: Form,
    path?: string | string[],
    config?: {
        delimiter?: string,
        isRoot?: boolean
    },
    children: (errors: string | undefined) => ReactNode
};

export default function ConsumeFormErrors(props: ConsumeFormErrorsProps) {
    const form = usePassedOrContextualForm(props.form);

    const value = useFormFormattedErrors(form, props.path, props.config);

    return (<>{ props.children(value) }</>);
}
