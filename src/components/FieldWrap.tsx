import { ReactNode, useCallback } from 'react';

import { FieldProvider } from '../contexts/FieldContext.js';
import useFormattedErrors from '../hooks/FieldWrap/useFormattedErrors.js';
import useContextualForm from '../hooks/useContextualForm.js';
import useFieldPath from '../hooks/useFieldPath.js';
import useFormData from '../hooks/useFormData.js';

export type NewValue<T> = T | ((value: T) => T) | undefined | null;

type Props<InputValue, OutputValue = InputValue> = {
    path?: string,
    typeDefaultValue?: InputValue,
    errors?: string | string[],
    children: (payload: {
        value: InputValue | undefined,
        error: string | undefined,
        change: (value: NewValue<OutputValue>) => void,
        clear: () => void
    }) => ReactNode
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
        <FieldProvider
            path={ normalizedPath }
            value={ value ?? props.typeDefaultValue }
            error={ formattedErrors }
            change={ change }
            clear={ clear }
        >
            {
                props.children({
                    value: value ?? props.typeDefaultValue,
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </FieldProvider>
    );
}
