export { FormFieldContextValue } from './contexts/FormFieldContext';

export type ValidationErrors = Record<string, string[]>;

export type FieldType<T = any> = {
    value: T,
    error?: string | undefined,
    change: (value: T) => void
};
