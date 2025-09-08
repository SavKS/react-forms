import { FormEventHandler, createContext, useContext } from 'react';

export type ContextualFormSubmitContextValue = FormEventHandler<HTMLFormElement> & (() => void);

export const ContextualFormSubmitContext = createContext<ContextualFormSubmitContextValue | undefined>(undefined);

ContextualFormSubmitContext.displayName = 'ContextualFormSubmitContext';

export const useContextualFormSubmit = () => {
    const context = useContext(ContextualFormSubmitContext);

    if (!context) {
        throw new Error('useContextualFormSubmit must be used within a FormWrap');
    }

    return context;
};
