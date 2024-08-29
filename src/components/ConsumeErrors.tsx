import { ReactNode, useContext, useMemo } from 'react';

import { FormContext } from '../contexts/FormContext';
import Form from '../Form';
import useFormErrors from '../hooks/useFormErrors';
import { ValidationErrors } from '../types';

type Props = {
    path: string | string[],
    form?: Form,
    config?: {
        extract?: boolean,
        isRoot?: boolean
    },
    extract?: boolean,
    isRoot?: boolean,
    children: (errors: ValidationErrors | undefined) => ReactNode
};

export default function ConsumeErrors(props: Props) {
    const extract = props.extract ?? props.config?.extract;
    const isRoot = props.isRoot ?? props.config?.isRoot;

    const contextForm = useContext(FormContext);

    const form = props.form ?? contextForm;

    if (!form) {
        throw new Error('Can\'t resolve form');
    }

    const errors = useFormErrors(form, props.path, { isRoot });

    const resultErrors = useMemo(() => {
        if (!extract || !Object.keys(errors).length) {
            return errors;
        }

        const paths = Array.isArray(props.path) ? props.path : [ props.path ];

        const extractPatterns = paths.reduce<RegExp[]>((carry, path) => {
            const extractPattern = path.replace(
                /\.\*$/,
                ''
            ).replaceAll(/\.\*/g, '.[\\w-]+');

            if (extractPattern) {
                carry.push(
                    new RegExp(`^${ extractPattern }`)
                );
            }

            return carry;
        }, []);

        const result = [];

        for (const [ errorPath, messages ] of Object.entries(errors)) {
            let isMatched = false;

            for (const extractPattern of extractPatterns) {
                if (extractPattern.test(errorPath)) {
                    result.push([
                        errorPath
                            .replace(extractPattern, '')
                            .replace(/\.$/, '')
                            .replace(/^\./, ''),

                        messages
                    ]);

                    isMatched = true;

                    break;
                }
            }

            if (!isMatched) {
                result.push([ errorPath, messages ]);
            }
        }

        return Object.fromEntries(result);
    }, [ extract, props.path, errors ]);

    return (
        <>
            {
                props.children(
                    Object.keys(resultErrors).length ?
                        resultErrors :
                        undefined
                )
            }
        </>
    );
}
