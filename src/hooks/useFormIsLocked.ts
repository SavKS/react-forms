import { useCallback, useSyncExternalStore } from 'react';

import Form from '../Form.js';

export default function useFormIsLocked(form: Form) {
    const getIsLocked = useCallback(
        () => form.isLocked,
        [ form ]
    );

    return useSyncExternalStore(
        form.onIsLockedChange,
        getIsLocked,
        getIsLocked
    );
}
