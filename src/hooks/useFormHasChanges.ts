import { useCallback, useSyncExternalStore } from 'react';

import Form from '../Form.js';
import useFieldPath from '../hooks/useFieldPath.js';

export default function useFormHasChanges(
    form: Form,
    path?: string,
    config: {
        isRoot?: boolean
    } = {}
) {
    const { isRoot } = config;

    const normalizedPath = useFieldPath(path ?? '', isRoot);

    const getHasChanges = useCallback(
        () => form.hasChanges(path ? normalizedPath : undefined),
        [ form, normalizedPath, path ]
    );

    return useSyncExternalStore(
        form.onDataChange,
        getHasChanges,
        getHasChanges
    );
}
