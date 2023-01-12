import { ReactNode, useContext } from 'react';
import useFormData from '../hooks/useFormData';
import Form from '../Form';
import { FormContext } from '../contexts/FormContext';

type Props<T> = {
    path: string,
    form?: Form,
    children: (value: T | undefined) => ReactNode
};

export default function ConsumeFieldValue<T = any>(props: Props<T>) {
    const contextForm = useContext(FormContext);

    const form = props.form ?? contextForm;

    if (!form) {
        throw new Error('Can\'t resolve form');
    }

    const value = useFormData(form, props.path);

    return (
        <>{ props.children(value) }</>
    );
}
