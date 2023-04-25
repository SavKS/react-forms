import { ChangeEvent, useCallback } from 'react';

import useFormattedErrors from '../hooks/FieldWrap/useFormattedErrors.js';
import useContextualForm from '../hooks/useContextualForm.js';
import useFieldPath from '../hooks/useFieldPath.js';
import useFormData from '../hooks/useFormData.js';

export type NewValue =
    | number
    | undefined
    | null
    | ChangeEvent<HTMLInputElement>;

type Props = {
    path: string,
    errors?: string | string[],
    children: (payload: {
        value: number | undefined,
        error?: string,
        change: (value: NewValue) => void,
        clear: () => void
    }) => void
};

export default function NumberFieldWrap(props: Props) {
    const form = useContextualForm();

    const normalizedPath = useFieldPath(props.path);

    const formattedErrors = useFormattedErrors(props.errors ?? props.path);

    const change = useCallback((newValue: NewValue) => {
        if (newValue === null || newValue === undefined) {
            form.delete(normalizedPath);
        } else {
            if (typeof newValue === 'number') {
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
                    value: value ?? undefined,
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </>
    );
}
