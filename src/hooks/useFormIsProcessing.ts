import { useCallback, useSyncExternalStore } from 'react';

import Form from '../Form.js';

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
