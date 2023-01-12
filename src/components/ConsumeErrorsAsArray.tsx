import { ReactNode, useContext } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import Form from '../Form';
import { useFormErrorsAsArray } from '../index';
import { FormContext } from '../contexts/FormContext';

type Props = {
    path: string | string[],
    form?: Form,
    config?: {
        isRoot?: boolean
    },
    children: (errors: string[]) => ReactNode
};

export default function ConsumeErrorsAsArray(props: Props) {
    const contextForm = useContext(FormContext);

    const form = props.form ?? contextForm;

    if (!form) {
        throw new Error('Can\'t resolve form');
    }

    const value = useFormErrorsAsArray(form, props.path, props.config);

    return (<>{ props.children(value) }</>);
}
