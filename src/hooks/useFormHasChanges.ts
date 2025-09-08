import { useCallback, useSyncExternalStore } from 'react';

import Form from '../Form';

import useFormPath from './useFormPath';

export default function useFormHasChanges(form: Form, path?: string, config?: {
    isRoot?: boolean
}) {
    const pathFromRoot = useFormPath(form, path ?? '', config?.isRoot);

    const getHasChanges = useCallback(
        () => form.hasChanges(path ? pathFromRoot : undefined),
        [ form, pathFromRoot, path ]
    );

    return useSyncExternalStore(
        form.onDataChange,
        getHasChanges,
        getHasChanges
    );
}
