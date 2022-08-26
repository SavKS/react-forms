import { useEffect, useRef } from 'react';
import Form from '../Form';
import useFormErrorsAsArray from './useFormErrorsAsArray';
import useFormIsProcessing from './useFormIsProcessing';

export default function useFormOnProcessed(
    form: Form,
    onSuccess?: (form: Form) => void,
    onFail?: (form: Form) => void
) {
    const isProcessingChanged = useRef<boolean>(false);
    const isProcessing = useFormIsProcessing(form);

    const hasErrors = useFormErrorsAsArray(form).length > 0;

    useEffect(() => {
        if (isProcessingChanged.current && !isProcessing) {
            isProcessingChanged.current = false;

            if (hasErrors) {
                onFail?.(form);
            } else {
                onSuccess?.(form);
            }
        }
    }, [ form, hasErrors, isProcessing, onFail, onSuccess ]);

    useEffect(() => {
        if (isProcessing) {
            isProcessingChanged.current = true;
        }
    }, [ isProcessing ]);
}
