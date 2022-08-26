import React, { ReactNode, useMemo } from 'react';
import Form from '../Form';
import useFormIsLocked from '../hooks/useFormIsLocked';
import useFormIsProcessing from '../hooks/useFormIsProcessing';

export type ContextualFormStatusContextValue = {
    isProcessing: boolean,
    isLocked: boolean
};

const defaultValue = {
    isProcessing: false,
    isLocked: false
};

export const FormStatusContext = React.createContext<ContextualFormStatusContextValue>(defaultValue);

export function FormStatusContextProvider(props: {
    form: Form,
    children: ReactNode
}) {
    const isProcessing = useFormIsProcessing(props.form);
    const isLocked = useFormIsLocked(props.form);

    const value = useMemo(
        () => ({
            isProcessing,
            isLocked
        }),
        [ isLocked, isProcessing ]
    );

    return <FormStatusContext.Provider value={ value }>{ props.children }</FormStatusContext.Provider>;
}
