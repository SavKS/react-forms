import get from '@savks/not-need-lodash/get';
import { ReactNode, createContext, useMemo } from 'react';

import Form from '../Form';
import useEvent from '../hooks/useEvent';

export type FormFieldContextValue<Value, NewValue = Value> = {
    path: string,
    valueGetter: () => Value,
    valueSetter: (value: NewValue) => void,
    valueClear: () => void,
    errorPaths?: string[]
};

export const FormFieldContext = createContext<FormFieldContextValue<any> | null>(null);

FormFieldContext.displayName = 'FormFieldContext';

export function FormFieldProvider<Value, NewValue = Value>(props: {
    form: Form,
    path: string,
    valueSetter: (value: NewValue) => void,
    errorPaths?: string[],
    children: ReactNode
}) {
    const valueGetter = useEvent(
        () => get(props.form.data, props.path)
    );

    const valueClear = useEvent(() => {
        props.form.delete(props.path);
    });

    const contextValue = useMemo<FormFieldContextValue<Value, NewValue>>(
        () => ({
            path: props.path,
            valueGetter,
            valueSetter: props.valueSetter,
            valueClear,
            errorPaths: props.errorPaths
        }),
        [ props.path, props.valueSetter, props.errorPaths, valueGetter, valueClear ]
    );

    return (
        <FormFieldContext value={ contextValue }>
            { props.children }
        </FormFieldContext>
    );
}
