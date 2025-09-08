import { useContext } from 'react';

import { FieldContext, FieldContextValue } from '../contexts/FieldContext';

function useFormField<Value = any, NewValue = Value>(): FieldContextValue<Value, NewValue>;

function useFormField<Value = any, NewValue = Value>(args: {
    optional: true
}): FieldContextValue<Value, NewValue> | undefined;

function useFormField(args?: { optional?: boolean }) {
    const fieldContext = useContext(FieldContext);

    if (!fieldContext && !args?.optional) {
        throw new Error('Can\'t resolve field context');
    }

    return fieldContext as any;
}

export default useFormField;
