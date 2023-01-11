import { ReactNode } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import useFormData from '../hooks/useFormData';
import Form from '../Form';

type Props<T> = {
    path: string,
    form?: Form,
    children: (value: T | undefined) => ReactNode
};

export default function ConsumeFieldValue<T = any>({ form, ...props }: Props<T>) {
    if (form) {
        return (
            <ForForm
                { ...props }
                form={ form }
            />
        );
    }

    return (
        <ForContextualForm { ...props } />
    );
}

function ForContextualForm<T = any>(props: Props<T>) {
    const value = useFormData(
        useContextualForm(),
        props.path
    );

    return (
        <>{ props.children(value) }</>
    );
}

function ForForm<T = any>(props: Props<T> & { form: Form }) {
    const value = useFormData(props.form, props.path);

    return (
        <>{ props.children(value) }</>
    );
}
