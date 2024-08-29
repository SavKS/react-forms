import { ChangeEvent as ReactChangeEvent, ReactNode, useCallback } from 'react';

import { FieldProvider } from '../contexts/FieldContext';
import useContextualForm from '../hooks/useContextualForm';
import useFieldPath from '../hooks/useFieldPath';
import useFormattedErrors from '../hooks/useFormattedErrors';
import useFormData from '../hooks/useFormData';

export type NewValue = number | undefined | null;

export type ChangeEvent = ReactChangeEvent<HTMLInputElement>;

export type ChangeFn = (value: number | undefined) => NewValue;

type Props = {
    path?: string,
    errors?: string | string[],
    resetErrors?: boolean,
    children: (payload: {
        value: number | undefined,
        error?: string,
        change: (value: NewValue | ChangeEvent | ChangeFn) => void,
        clear: () => void
    }) => ReactNode
};

export default function NumberFieldWrap(props: Props) {
    const form = useContextualForm();

    const normalizedPath = useFieldPath(props.path);

    const errorPath = props.errors ?? props.path;

    const normalizedErrorPath = useFieldPath(
        errorPath ? [ errorPath ].flat() : undefined
    );

    const formattedErrors = useFormattedErrors(errorPath);

    const change = useCallback((newValue: NewValue | ChangeEvent | ChangeFn) => {
        if (newValue === null || newValue === undefined) {
            form.delete(normalizedPath);
        } else {
            if (typeof newValue === 'number' || typeof newValue === 'function') {
                form.change(normalizedPath, newValue);
            } else {
                form.change(normalizedPath, newValue.currentTarget.value);
            }

        }

        if (props.resetErrors) {
            form.clearErrors(normalizedErrorPath);
        }
    }, [ form, normalizedErrorPath, normalizedPath, props.resetErrors ]);

    const clear = useCallback(() => {
        form.delete(normalizedPath);
    }, [ form, normalizedPath ]);

    const value = useFormData(form, props.path);

    return (
        <FieldProvider
            path={ normalizedPath }
            value={ value ?? undefined }
            error={ formattedErrors }
            change={ change }
            clear={ clear }
        >
            {
                props.children({
                    value: value ?? undefined,
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </FieldProvider>
    );
}
