import isEqual from '@savks/not-need-lodash/isEqual';
import { useCallback, useContext } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector.js';

import { ScopeContext } from '../contexts/ScopeContext.js';
import Form from '../Form.js';
import { ValidationErrors } from '../types.js';
import extractErrors from '../utils/extractErrors.js';
import filterErrors from '../utils/filterErrors.js';

const resolveErrors = (errors: ValidationErrors, scope?: string, names?: string | string[]) => {
    const filteredErrors = scope ? extractErrors(errors, scope) : errors;

    return filterErrors(filteredErrors, names);
};

export default function useFormErrors(form: Form, names?: string | string[], config?: {
    isRoot?: boolean
}) {
    const scope = useContext(ScopeContext);

    const resultScope = config?.isRoot ? undefined : scope;

    const getErrors = useCallback(
        () => form.errors,
        [ form ]
    );

    return useSyncExternalStoreWithSelector(
        form.onErrorsChange,
        getErrors,
        getErrors,
        useCallback(
            errors => resolveErrors(errors, resultScope, names),
            [ resultScope, names ]
        ),
        isEqual
    );
}
