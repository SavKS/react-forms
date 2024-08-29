import { createContext } from 'react';

import Form from '../Form';

export type ScopeContextValue = {
    form: Form,
    path: string
};

export const ScopeContext = createContext<ScopeContextValue | undefined>(undefined);
