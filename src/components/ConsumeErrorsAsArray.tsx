import { ReactNode } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import Form from '../Form';
import { useFormErrorsAsArray } from '../index';

type Props = {
    path: string | string[],
    form?: Form,
    children: (errors: string[]) => ReactNode
};

export default function ConsumeErrorsAsArray({ form, ...props }: Props) {
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

function ForContextualForm(props: Props) {
    const value = useFormErrorsAsArray(
        useContextualForm(),
        props.path
    );

    return (<>{ props.children(value) }</>);
}

function ForForm<T = any>(props: Props & { form: Form }) {
    const value = useFormErrorsAsArray(props.form, props.path);

    return (<>{ props.children(value) }</>);
}
