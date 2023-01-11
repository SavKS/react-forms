import { ReactNode } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import Form from '../Form';
import useFormFormattedErrors from '../hooks/useFormFormattedErrors';

type Props = {
    path: string | string[],
    delimiter?: string,
    form?: Form,
    children: (errors: string | undefined) => ReactNode
};

export default function ConsumeFormErrors({ form, ...props }: Props) {
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
    const value = useFormFormattedErrors(
        useContextualForm(),
        props.path,
        props.delimiter
    );

    return (<>{ props.children(value) }</>);
}

function ForForm<T = any>(props: Props & { form: Form }) {
    const value = useFormFormattedErrors(props.form, props.path, props.delimiter);

    return (<>{ props.children(value) }</>);
}
