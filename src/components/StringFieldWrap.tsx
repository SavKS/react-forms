import React, { ChangeEvent, useCallback } from 'react';
import useFormattedErrors from '../hooks/FieldWrap/useFormattedErrors';
import useContextualForm from '../hooks/useContextualForm';
import useFieldPath from '../hooks/useFieldPath';
import useFormData from '../hooks/useFormData';

export type NewValue =
    | string
    | undefined
    | null
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
    path: string,
    errors?: string | string[],
    children: (payload: {
        value: string,
        error?: string,
        change: (value: NewValue) => void,
        clear: () => void
    }) => void
}

export default function StringFieldWrap(props: Props) {
    const form = useContextualForm();

    const normalizedPath = useFieldPath(props.path);

    const formattedErrors = useFormattedErrors(props.errors ?? props.path);

    const change = useCallback((newValue: NewValue) => {
        if (newValue === null || newValue === undefined) {
            form.delete(normalizedPath);
        } else {
            if (typeof newValue === 'string') {
                form.change(normalizedPath, newValue);
            } else {
                form.change(normalizedPath, newValue.currentTarget.value);
            }

        }
    }, [ form, normalizedPath ]);

    const clear = useCallback(() => {
        form.delete(normalizedPath);
    }, [ form, normalizedPath ]);

    const value = useFormData(form, props.path);

    return (
        <>
            {
                props.children({
                    value: value ?? '',
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </>
    );
}
