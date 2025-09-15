import { use } from 'react';

import { FormFieldContext, FormFieldContextValue } from '../contexts/FormFieldContext';

function useFormField<Value = any, NewValue = Value>(): FormFieldContextValue<Value, NewValue>;

function useFormField<Value = any, NewValue = Value>(args: {
    optional: true
}): FormFieldContextValue<Value, NewValue> | undefined;

function useFormField(args?: { optional?: boolean }) {
    const fieldContext = use(FormFieldContext);

    if (!fieldContext && !args?.optional) {
        throw new Error('Can\'t resolve field context');
    }

    return fieldContext as any;
}

export default useFormField;
