import React, { FormEventHandler, useContext } from 'react';

export type ContextualSubmitContextValue = FormEventHandler<HTMLFormElement> & (() => void);

export const ContextualSubmitContext = React.createContext<ContextualSubmitContextValue | undefined>(undefined);

export const useContextualSubmit = () => {
    const context = useContext(ContextualSubmitContext);

    if (!context) {
        throw new Error('useContextualSubmit must be used within a FormWrap');
    }

    return context;
};
