import { ChangeEvent as ReactChangeEvent, ReactNode, useCallback } from 'react';

import { FieldProvider } from '../contexts/FieldContext.js';
import useFormattedErrors from '../hooks/FieldWrap/useFormattedErrors.js';
import useContextualForm from '../hooks/useContextualForm.js';
import useFieldPath from '../hooks/useFieldPath.js';
import useFormData from '../hooks/useFormData.js';

export type ChangeEvent = ReactChangeEvent<HTMLInputElement>;

export type NewValue = boolean | undefined | null;

export type ChangeFn = (value: boolean | undefined) => NewValue;

type Props = {
    path?: string,
    errors?: string | string[],
    resetErrors?: boolean,
    children: (payload: {
        value: boolean,
        error?: string,
        change: (value: NewValue | ChangeEvent | ChangeFn) => void,
        clear: () => void
    }) => ReactNode
};

export default function BooleanFieldWrap(props: Props) {
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
            if (typeof newValue === 'boolean' || typeof newValue === 'function') {
                form.change(normalizedPath, newValue);
            } else {
                form.change(normalizedPath, newValue.currentTarget.checked);
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
            value={ value ?? false }
            error={ formattedErrors }
            change={ change }
            clear={ clear }
        >
            {
                props.children({
                    value: value ?? false,
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </FieldProvider>
    );
}
