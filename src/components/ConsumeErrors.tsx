import { ReactNode, useContext, useMemo } from 'react';

import { FormContext } from '../contexts/FormContext.js';
import Form from '../Form.js';
import useFormErrors from '../hooks/useFormErrors.js';
import { ValidationErrors } from '../types.js';

type Props = {
    path: string | string[],
    form?: Form,
    config?: {
        extract?: boolean,
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

    let value = useFormErrors(form, props.path, props.config);

    value = useMemo(() => {
        if (!props.config?.extract || !Object.keys(value).length) {
            return value;
        }

        const extractPattern = (Array.isArray(props.path) ? props.path.join('.') : props.path).replace(
            /\.\*$/,
            ''
        ).replaceAll(/\.\*/g, '.[\\w-]+');

        if (!extractPattern) {
            return value;
        }

        return Object.fromEntries(
            Object.entries(value).map(([ key, value ]) => [
                key.replace(
                    new RegExp(`^${ extractPattern }`),
                    ''
                ).replace(/\.$/, '').replace(/^\./, ''),
                value
            ])
        );
    }, [ props.config?.extract, props.path, value ]);

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
