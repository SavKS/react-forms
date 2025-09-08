import { ChangeEvent as ReactChangeEvent, ReactNode } from 'react';

import { FieldProvider } from '../../contexts/FieldContext';
import Form from '../../Form';
import useEvent from '../../hooks/useEvent';
import useFormattedFormErrors from '../../hooks/useFormattedFormErrors';
import useFormData from '../../hooks/useFormData';
import useFormPath from '../../hooks/useFormPath';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type NewValue = string | undefined | null;

export type ChangeEvent = ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type ChangeFn = (value: string | undefined) => NewValue;

type Props<TIsUndefinedAllowed extends boolean = false> = {
    form?: Form,
    path?: string,
    errors?: string | string[],
    resetErrors?: boolean,
    allowUndefined?: TIsUndefinedAllowed,
    children: (payload: {
        value: TIsUndefinedAllowed extends true ? string | undefined : string,
        error?: string,
        change: (value: NewValue | ChangeEvent | ChangeFn) => void,
        clear: () => void
    }) => ReactNode
};

export default function StringFieldWrap<TIsUndefinedAllowed extends boolean = false>(
    props: Props<TIsUndefinedAllowed>
) {
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
            if (typeof newValue === 'string' || typeof newValue === 'function') {
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
        typeof value !== 'string'
        && value !== undefined
    ) {
        // eslint-disable-next-line no-console
        console.error('StringFieldWrap: value must be string or undefined, but got ', value);
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
                    value: (
                        value === undefined
                            ? (props.allowUndefined ? undefined : '')
                            : value
                    ) as TIsUndefinedAllowed extends true ? string | undefined : string,

                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </FieldProvider>
    );
}
