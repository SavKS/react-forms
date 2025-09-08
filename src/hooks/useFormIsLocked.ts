import { useSyncExternalStore } from 'react';

import Form from '../Form';

import useEvent from './useEvent';

export default function useFormIsLocked(form: Form) {
    const getIsLocked = useEvent(
        () => form.isLocked
    );

    return useSyncExternalStore(
        form.onIsLockedChange,
        getIsLocked,
        getIsLocked
    );
}
