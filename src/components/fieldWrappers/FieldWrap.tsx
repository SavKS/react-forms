import { ReactNode } from 'react';

import { FieldProvider } from '../../contexts/FieldContext';
import Form from '../../Form';
import useEvent from '../../hooks/useEvent';
import useFormattedErrors from '../../hooks/useFormattedFormErrors';
import useFormData from '../../hooks/useFormData';
import useFormPath from '../../hooks/useFormPath';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type NewValue<T> = T | ((value: T) => T) | undefined | null;

type Props<InputValue, OutputValue = InputValue> = {
    form?: Form,
    path?: string,
    errors?: string | string[],
    resetErrors?: boolean,
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
    const form = usePassedOrContextualForm(props.form);
    const pathFromRoot = useFormPath(form, props.path);
    const errorPath = props.errors ?? props.path;

    const errorPathsFromRoot = useFormPath(
        form,
        errorPath ? [ errorPath ].flat() : undefined
    );

    const formattedErrors = useFormattedErrors(form, errorPath);

    const change = useEvent((newValue: NewValue<OutputValue>) => {
        if (newValue === null || newValue === undefined) {
            form.delete(pathFromRoot);
        } else {
            form.change(pathFromRoot, newValue);
        }

        if (props.resetErrors) {
            form.clearErrors(errorPathsFromRoot);
        }
    });

    const clear = useEvent(() => {
        form.delete(pathFromRoot);
    });

    const value = useFormData(form, props.path);

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
