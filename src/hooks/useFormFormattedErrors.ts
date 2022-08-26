import { useMemo } from 'react';
import Form from '../Form';
import useFormErrors from '../hooks/useFormErrors';
import formatErrors from '../utils/formatErrors';

export default function useFormFormattedErrors(form: Form, names?: string | string[], delimiter = '. ') {
    const errors = useFormErrors(form, names);

    return useMemo(
        () => formatErrors(errors, undefined, delimiter),
        [ delimiter, errors ]
    );
}
