import { useSyncExternalStore } from 'react';

import Form from '../Form';

import useEvent from './useEvent';

export default function useFormIsProcessing(form: Form) {
    const getIsProcessing = useEvent(
        () => form.isProcessing
    );

    return useSyncExternalStore(
        form.onIsProcessingChange,
        getIsProcessing,
        getIsProcessing
    );
}
