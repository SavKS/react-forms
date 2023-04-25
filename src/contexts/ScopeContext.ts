import { createContext } from 'react';

export type ScopeContextValue = string;

export const ScopeContext = createContext<ScopeContextValue | undefined>(undefined);
