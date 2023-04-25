import { useCallback, useSyncExternalStore } from 'react';

import Form from '../Form.js';

export default function useFormIsModified(form: Form) {
    const getIsModified = useCallback(
        () => form.isModified,
        [ form ]
    );

    return useSyncExternalStore(
        form.onIsModifiedChange,
        getIsModified,
        getIsModified
    );
}
