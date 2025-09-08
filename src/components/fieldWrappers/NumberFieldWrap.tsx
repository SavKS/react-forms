import { ChangeEvent as ReactChangeEvent, ReactNode, useCallback } from 'react';

import { FieldProvider } from '../../contexts/FieldContext';
import Form from '../../Form';
import useContextualForm from '../../hooks/useContextualForm';
import useEvent from '../../hooks/useEvent';
import useFormattedFormErrors from '../../hooks/useFormattedFormErrors';
import useFormData from '../../hooks/useFormData';
import useFormPath from '../../hooks/useFormPath';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type NewValue = number | undefined | null;

export type ChangeEvent = ReactChangeEvent<HTMLInputElement>;

export type ChangeFn = (value: number | undefined) => NewValue;

type Props = {
    form?: Form,
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
    const form = usePassedOrContextualForm(props.form);
    const pathFromRoot = useFormPath(form, props.path);
    const errorPath = props.errors ?? props.path;

    const errorPathsFromRoot = useFormPath(
        form,
        errorPath ? [ errorPath ].flat() : undefined
    );

    const formattedErrors = useFormattedFormErrors(form, errorPath);

    const change = useEvent((newValue: NewValue | ChangeEvent | ChangeFn) => {
        if (newValue === null || newValue === undefined) {
            form.delete(pathFromRoot);
        } else {
            if (typeof newValue === 'number' || typeof newValue === 'function') {
                form.change(pathFromRoot, newValue);
            } else {
                form.change(pathFromRoot, newValue.currentTarget.value);
            }

        }

        if (props.resetErrors) {
            form.clearErrors(errorPathsFromRoot);
        }
    });

    const clear = useEvent(() => {
        form.delete(pathFromRoot);
    });

    const value = useFormData(form, props.path);

    if (
        typeof value !== 'number'
        && value !== undefined
    ) {
        // eslint-disable-next-line no-console
        console.error('NumberFieldWrap: value must be number or undefined, but got ', value);
    }

    return (
        <FieldProvider
            form={ form }
            path={ pathFromRoot }
            valueSetter={ change }
            errorPaths={ errorPathsFromRoot }
        >
            {
                props.children({
                    value,
                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </FieldProvider>
    );
}
