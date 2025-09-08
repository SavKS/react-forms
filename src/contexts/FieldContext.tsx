import get from '@savks/not-need-lodash/get';
import { ReactNode, createContext, useMemo } from 'react';

import Form from '../Form';
import useEvent from '../hooks/useEvent';

export type FieldContextValue<Value, NewValue = Value> = {
    path: string,
    valueGetter: () => Value,
    valueSetter: (value: NewValue) => void,
    valueClear: () => void,
    errorPaths?: string[]
};

export const FieldContext = createContext<FieldContextValue<any> | null>(null);

FieldContext.displayName = 'FieldContext';

export function FieldProvider<Value, NewValue = Value>(props: {
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

    const contextValue = useMemo<FieldContextValue<Value, NewValue>>(
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
        <FieldContext.Provider value={ contextValue }>
            { props.children }
        </FieldContext.Provider>
    );
}
