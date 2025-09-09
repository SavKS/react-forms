import { useContext } from 'react';

import { FormContext } from '../contexts/FormContext';
import Form from '../Form';

function useContextualForm(opts: {
    optional: true
}): Form | undefined;

function useContextualForm(opts?: {
    optional?: false
}): Form;

function useContextualForm(opts?: {
    optional?: boolean
}) {
    const formContext = useContext(FormContext);

    if (!formContext && !opts?.optional) {
        throw new Error('Can\'t resolve form context.');
    }

    return formContext;
}

export default useContextualForm;
