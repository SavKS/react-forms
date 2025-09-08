import { useMemo } from 'react';

import Form from '../Form';

import useFormIsLocked from './useFormIsLocked';
import useFormIsProcessing from './useFormIsProcessing';

export default (form: Form) => {
    const isProcessing = useFormIsProcessing(form);
    const isLocked = useFormIsLocked(form);

    return useMemo(
        () => ({
            isProcessing,
            isLocked
        }),
        [ isLocked, isProcessing ]
    );
};
