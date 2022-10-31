import { useCallback, useSyncExternalStore } from 'react';
import Form from '../Form';

export default function useFormIsProcessing(form: Form) {
    const getIsProcessing = useCallback(
        () => form.isProcessing,
        [ form ]
    );

    return useSyncExternalStore(
        form.onIsProcessingChange,
        getIsProcessing,
        getIsProcessing
    );
}
