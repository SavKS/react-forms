import { useMemo } from 'react';

import Form from '../Form.js';
import useFormErrors from '../hooks/useFormErrors.js';
import formatErrors from '../utils/formatErrors.js';

export default function useFormFormattedErrors(form: Form, names?: string | string[], config?: {
    delimiter?: string,
    isRoot?: boolean
}) {
    const errors = useFormErrors(form, names, {
        isRoot: config?.isRoot
    });

    return useMemo(
        () => formatErrors(errors, undefined, config?.delimiter),
        [ config?.delimiter, errors ]
    );
}
