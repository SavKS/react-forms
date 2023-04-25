import { ReactNode, useContext } from 'react';

import { FormContext } from '../contexts/FormContext.js';
import Form from '../Form.js';
import useFormErrors from '../hooks/useFormErrors.js';
import { ValidationErrors } from '../types.js';

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
