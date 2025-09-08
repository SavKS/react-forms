import { useContext } from 'react';

import { FormContext } from '../contexts/FormContext';
import Form from '../Form';

export default function usePassedOrContextualForm(form: Form | undefined) {
    const formContext = useContext(FormContext);

    if (form) {
        return form;
    }

    if (!formContext) {
        throw new Error('Can\'t resolve form context');
    }

    return formContext;
}
