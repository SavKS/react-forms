export { FieldContextValue } from './contexts/FieldContext';

export type ValidationError = Record<string, string[]>;
export type ValidationErrors = ValidationError;

export type FieldType<T = any> = {
    value: T,
    error?: string | undefined,
    change: (value: T) => void
};
