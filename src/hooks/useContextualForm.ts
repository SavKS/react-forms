import { useContext } from 'react';

import { FormContext } from '../contexts/FormContext';

export default function useContextualForm() {
    const formContext = useContext(FormContext);

    if (!formContext) {
        throw new Error('Can\'t resolve form context');
    }

    return formContext;
}
