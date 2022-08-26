import { useEffect, useState } from 'react';
import Form from '../Form';

export default function useFormIsModified(form: Form) {
    const [ isModified, setIsModified ] = useState(
        () => form.isModified
    );

    useEffect(
        () => form.onIsModifiedChange((newValue) => {
            setIsModified(newValue);
        }),
        [ form ]
    );

    return isModified;
}
