import { useMemo } from 'react';

import Form from '../Form';
import useFormErrors from '../hooks/useFormErrors';

export default function useFormFormattedErrors(form: Form, names?: string | string[], config?: {
    isRoot?: boolean
}) {
    const errors = useFormErrors(form, names, config);

    return useMemo(
        () => Object.values(errors).flat(),
        [ errors ]
    );
}
