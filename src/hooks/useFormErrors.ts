import { dequal } from 'dequal';
import { useCallback, useRef } from 'react';
import { useSyncExternalStore } from 'react';

import Form from '../Form';
import { ValidationError, ValidationErrors } from '../types';
import extractErrors from '../utils/extractErrors';
import filterErrors from '../utils/filterErrors';

import useScopePath from './useScopePath';

const none = Symbol('none');

const resolveErrors = (errors: ValidationErrors, scope?: string, names?: string | string[]) => {
    const filteredErrors = scope ? extractErrors(errors, scope) : errors;

    return filterErrors(filteredErrors, names);
};

export default function useFormErrors(form: Form, names?: string | string[], config?: {
    isRoot?: boolean
}) {
    const prevValue = useRef<ValidationError | typeof none>(none);

    const scope = useScopePath(form);

    const resultScope = config?.isRoot ? undefined : scope;

    const getErrors = useCallback(() => {
        let errors = resolveErrors(form.errors, resultScope, names);

        const current = prevValue.current;

        if (current !== none) {
            errors = dequal(errors, current) ? current : errors;
        }

        prevValue.current = errors;

        return errors;
    }, [ form.errors, resultScope, names ]);

    return useSyncExternalStore(form.onErrorsChange, getErrors, getErrors);
}
