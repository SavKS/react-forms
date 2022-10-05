import React, { useCallback } from 'react';
import useFormattedErrors from '../hooks/FieldWrap/useFormattedErrors';
import useContextualForm from '../hooks/useContextualForm';
import useFieldPath from '../hooks/useFieldPath';
import useFormData from '../hooks/useFormData';

export type NewValue<T> =
    | T
    | ((value: T) => T)
    | undefined
    | null;

type Props<InputValue, OutputValue = InputValue> = {
    path: string,
    typeDefaultValue?: InputValue,
    errors?: string | string[],
    children: (payload: {
        value: InputValue,
        error?: string,
        change: (value: NewValue<OutputValue>) => void,
        clear: () => void
    }) => void
};

export default function FieldWrap<InputValue, OutputValue = InputValue>(
    props: Props<InputValue, OutputValue>
) {
    const form = useContextualForm();

    const normalizedPath = useFieldPath(props.path);

    const formattedErrors = useFormattedErrors(props.errors ?? props.path);

    const change = useCallback((newValue: NewValue<OutputValue>) => {
        if (newValue === null || newValue === undefined) {
            form.delete(normalizedPath);
        } else {
            form.change(normalizedPath, newValue);
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
                    value: value ?? props.typeDefaultValue,
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </>
    );
}
