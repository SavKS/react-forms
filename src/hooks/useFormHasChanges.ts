import { useEffect, useState } from 'react';
import Form from '../Form';
import useFieldPath from '../hooks/useFieldPath';

export default function useFormHasChanges(
    form: Form,
    path?: string,
    config: {
        isRoot?: boolean
    } = {}
) {
    const { isRoot } = config;

    const normalizedPath = useFieldPath(path ?? '', isRoot);

    const [ hasChanges, setHasChanges ] = useState(
        () => form.hasChanges(path ? normalizedPath : undefined)
    );

    useEffect(
        () => form.onDataChange(() => {
            setHasChanges(
                form.hasChanges(path ? normalizedPath : undefined)
            );
        }),
        [ form, normalizedPath, path ]
    );

    return hasChanges;
}
