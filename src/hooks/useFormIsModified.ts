import { useCallback, useSyncExternalStore } from 'react';

import Form from '../Form';

import useEvent from './useEvent';

export default function useFormIsModified(form: Form) {
    const getIsModified = useEvent(
        () => form.isModified
    );

    return useSyncExternalStore(
        form.onIsModifiedChange,
        getIsModified,
        getIsModified
    );
}
