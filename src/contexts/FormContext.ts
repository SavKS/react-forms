import React from 'react';
import Form from '../Form';

export type FormContextValue = Form;

export const FormContext = React.createContext<FormContextValue | undefined>(undefined);
