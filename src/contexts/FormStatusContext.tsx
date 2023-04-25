import { ReactNode, createContext, useMemo } from 'react';

import Form from '../Form.js';
import useFormIsLocked from '../hooks/useFormIsLocked.js';
import useFormIsProcessing from '../hooks/useFormIsProcessing.js';

export type ContextualFormStatusContextValue = {
    isProcessing: boolean,
    isLocked: boolean
};

const defaultValue = {
    isProcessing: false,
    isLocked: false
};

export const FormStatusContext = createContext<ContextualFormStatusContextValue>(defaultValue);

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
