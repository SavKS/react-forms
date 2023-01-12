import { useMemo } from 'react';
import Form from '../Form';
import useFormErrors from '../hooks/useFormErrors';
import formatErrors from '../utils/formatErrors';

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
