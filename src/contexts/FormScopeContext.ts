import { createContext } from 'react';

import Form from '../Form';

export type FormScopeContextValue = {
    form: Form,
    path: string
};

export const FormScopeContext = createContext<FormScopeContextValue | undefined>(undefined);

FormScopeContext.displayName = 'FormScopeContext';
