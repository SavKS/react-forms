import { useContext } from 'react';

import { FieldContext, FieldContextValue } from '../contexts/FieldContext';

function useField<Value = any, NewValue = Value>(): FieldContextValue<Value, NewValue>;

function useField<Value = any, NewValue = Value>(args: { optional: true }): FieldContextValue<Value, NewValue> | undefined;

function useField(args?: { optional?: boolean }) {
    const fieldContext = useContext(FieldContext);

    if (!fieldContext && !args?.optional) {
        throw new Error('Can\'t resolve field context');
    }

    return fieldContext as any;
}

export default useField;
