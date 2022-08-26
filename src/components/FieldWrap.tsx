import { useMemoCompare } from '@savks/react-helpers';
import React, { useCallback, useMemo } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import useFieldPath from '../hooks/useFieldPath';
import useFormData from '../hooks/useFormData';
import useFormFormattedErrors from '../hooks/useFormFormattedErrors';

export type FieldWrapProps<InputValue, OutputValue = InputValue> = {
    path: string,
    typeDefaultValue?: InputValue,
    errors?: string | string[],
    children: (payload: {
        value: InputValue,
        error?: string,
        change: (value: OutputValue) => void,
        clear: () => void
    }) => void
};

export default function FieldWrap<InputValue, OutputValue = InputValue>(
    props: FieldWrapProps<InputValue, OutputValue>
) {
    const form = useContextualForm();

    const normalizedPath = useFieldPath(props.path);

    const errorPaths = useMemo(() => {
        if (!props.errors) {
            return [ props.path ];
        }

        if (typeof props.errors === 'string') {
            return [ props.errors ];
        }

        return props.errors;
    }, [ props.errors, props.path ]);

    const formattedErrors = useFormFormattedErrors(
        form,
        useMemoCompare(() => errorPaths, [ errorPaths ])
    );

    const change = useCallback((newValue: OutputValue) => {
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
