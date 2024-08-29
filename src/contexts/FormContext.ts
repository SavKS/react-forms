import { createContext } from 'react';

import Form from '../Form';

export type FormContextValue = Form;

export const FormContext = createContext<FormContextValue | undefined>(undefined);
