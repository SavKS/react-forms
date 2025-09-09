import { useSyncExternalStore } from 'react';

import Form from '../Form';

import useEvent from './useEvent';
import useFormPath from './useFormPath';

export default function useFormHasChanges(form: Form, path?: string, config?: {
    isRoot?: boolean
}) {
    const pathFromRoot = useFormPath(form, path ?? '', config?.isRoot);

    const getHasChanges = useEvent(
        () => form.hasChanges(path ? pathFromRoot : undefined)
    );

    return useSyncExternalStore(
        form.onDataChange,
        getHasChanges,
        getHasChanges
    );
}
