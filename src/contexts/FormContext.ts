import { createContext } from 'react';

import Form from '../Form.js';

export type FormContextValue = Form;

export const FormContext = createContext<FormContextValue | undefined>(undefined);
