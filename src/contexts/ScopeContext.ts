import { createContext } from 'react';

import Form from '../Form.js';

export type ScopeContextValue = {
    form: Form,
    path: string
};

export const ScopeContext = createContext<ScopeContextValue | undefined>(undefined);
