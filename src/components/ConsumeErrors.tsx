import { ReactNode, useContext } from 'react';
import Form from '../Form';
import useFormErrors from '../hooks/useFormErrors';
import { ValidationErrors } from '../types';
import { FormContext } from '../contexts/FormContext';

type Props = {
    path: string | string[],
    form?: Form,
    config?: {
        isRoot?: boolean
    },
    children: (errors: ValidationErrors | undefined) => ReactNode
};

export default function ConsumeErrors(props: Props) {
    const contextForm = useContext(FormContext);

    const form = props.form ?? contextForm;

    if (!form) {
        throw new Error('Can\'t resolve form');
    }

    const value = useFormErrors(form, props.path, props.config);

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
