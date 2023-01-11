import { ReactNode } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import Form from '../Form';
import useFormErrors from '../hooks/useFormErrors';
import { ValidationErrors } from '../types';

type Props = {
    path: string | string[],
    form?: Form,
    children: (errors: ValidationErrors | undefined) => ReactNode
};

export default function ConsumeErrors({ form, ...props }: Props) {
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
    const value = useFormErrors(
        useContextualForm(),
        props.path
    );

    return (
        <>
            {
                props.children(
                    Object.keys(value).length ?
                        value :
                        undefined
                )
            }
        </>
    );
}

function ForForm<T = any>(props: Props & { form: Form }) {
    const value = useFormErrors(props.form, props.path);

    return (
        <>
            {
                props.children(
                    Object.keys(value).length ?
                        value :
                        undefined
                )
            }
        </>
    );
}
