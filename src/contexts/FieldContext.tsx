import { ReactNode, createContext, useMemo } from 'react';

export type FieldContextValue<Value, NewValue = Value> = {
    path: string,
    value: Value,
    error?: string,
    change: (value: NewValue) => void,
    clear: () => void
};

export const FieldContext = createContext<FieldContextValue<any> | null>(null);

export function FieldProvider<Value, NewValue = Value>(props: {
    path: string,
    value: Value,
    error?: string,
    change: (value: NewValue) => void,
    clear: () => void,
    children: ReactNode
}) {
    const contextValue = useMemo<FieldContextValue<Value, NewValue>>(
        () => ({
            path: props.path,
            value: props.value,
            error: props.error,
            change: props.change,
            clear: props.clear
        }),
        [ props.change, props.clear, props.error, props.path, props.value ]
    );

    return (
        <FieldContext.Provider value={ contextValue }>
            { props.children }
        </FieldContext.Provider>
    );
}
