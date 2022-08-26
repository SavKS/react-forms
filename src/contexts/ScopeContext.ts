import React from 'react';

export type ScopeContextValue = string;

export const ScopeContext = React.createContext<ScopeContextValue | undefined>(undefined);
