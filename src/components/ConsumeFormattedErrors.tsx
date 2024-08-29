import { ReactNode, useContext } from 'react';

import { FormContext } from '../contexts/FormContext';
import Form from '../Form';
import useFormFormattedErrors from '../hooks/useFormFormattedErrors';

type Props = {
    path: string | string[],
    form?: Form,
    config?: {
        delimiter?: string,
        isRoot?: boolean
    },
    children: (errors: string | undefined) => ReactNode
};

export default function ConsumeFormErrors(props: Props) {
    const contextForm = useContext(FormContext);

    const form = props.form ?? contextForm;

    if (!form) {
        throw new Error('Can\'t resolve form');
    }

    const value = useFormFormattedErrors(form, props.path, props.config);

    return (<>{ props.children(value) }</>);
}
