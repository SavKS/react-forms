import { useEffect, useState } from 'react';
import Form from '../Form';

export default function useFormIsLocked(form: Form) {
    const [ isLocked, setIsLocked ] = useState(
        () => form.isProcessing
    );

    useEffect(
        () => form.onIsLockedChange((newValue) => {
            setIsLocked(newValue);
        }),
        [ form ]
    );

    return isLocked;
}
