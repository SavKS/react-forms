import isEqual from '@savks/not-need-lodash/isEqual';
import { useContext, useEffect, useState } from 'react';
import { ScopeContext } from '../contexts/ScopeContext';
import Form from '../Form';
import { ValidationErrors } from '../types';
import extractErrors from '../utils/extractErrors';
import filterErrors from '../utils/filterErrors';

const resolveErrors = (errors: ValidationErrors, scope?: string, names?: string | string[]) => {
    const filteredErrors = scope ? extractErrors(errors, scope) : errors;

    return filterErrors(filteredErrors, names);
};

export default function useFormErrors(form: Form, names?: string | string[]) {
    const scope = useContext(ScopeContext);

    const [ errors, setErrors ] = useState(
        () => resolveErrors(form.errors, scope, names)
    );

    useEffect(
        () => form.onErrorsChange((errors) => {
            setErrors(
                oldErrors => {
                    const newErrors = resolveErrors(errors, scope, names);

                    if (isEqual(oldErrors, newErrors)) {
                        return oldErrors;
                    }

                    return newErrors;
                }
            );
        }),
        [ form, errors, names, scope ]
    );

    return errors;
}
