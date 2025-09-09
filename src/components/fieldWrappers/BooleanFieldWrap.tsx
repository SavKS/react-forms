import { ChangeEvent as ReactChangeEvent, ReactNode } from 'react';

import { FormFieldProvider } from '../../contexts/FormFieldContext';
import Form from '../../Form';
import useEvent from '../../hooks/useEvent';
import useFormattedFormErrors from '../../hooks/useFormattedFormErrors';
import useFormData from '../../hooks/useFormData';
import useFormPath from '../../hooks/useFormPath';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type NewValue = boolean | undefined | null;

export type ChangeEvent = ReactChangeEvent<HTMLInputElement>;

export type ChangeFn = (value: boolean | undefined) => NewValue;

type Props<TIsUndefinedAllowed extends boolean = false> = {
    form?: Form,
    path?: string,
    errors?: string | string[],
    resetErrors?: boolean,
    allowUndefined?: TIsUndefinedAllowed,
    children: (payload: {
        value: TIsUndefinedAllowed extends true ? boolean | undefined : boolean,
        error?: string,
        change: (value: NewValue | ChangeEvent | ChangeFn) => void,
        clear: () => void
    }) => ReactNode
};

export default function BooleanFieldWrap<TIsUndefinedAllowed extends boolean = false>(
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
            if (typeof newValue === 'boolean' || typeof newValue === 'function') {
                form.change(pathFromRoot, newValue);
            } else {
                form.change(pathFromRoot, newValue.currentTarget.checked);
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
        typeof value !== 'boolean'
        && value !== undefined
    ) {
        // eslint-disable-next-line no-console
        console.error('BooleanFieldWrap: value must be boolean or undefined, but got ', value);
    }

    return (
        <FormFieldProvider
            form={ form }
            path={ pathFromRoot }
            valueSetter={ change }
            errorPaths={ errorPathsFromRoot }
        >
            {
                props.children({
                    value: (
                        value === undefined
                            ? (props.allowUndefined ? undefined : false)
                            : value
                    ) as TIsUndefinedAllowed extends true ? boolean | undefined : boolean,

                    error: formattedErrors,
                    change,
                    clear
                })
            }
        </FormFieldProvider>
    );
}
