import { useCallback } from 'react';
import Form from '../Form';
import useFieldPath from './useFieldPath';

type Config = {
    isRoot?: boolean
};

export default <T = any>(form: Form, path: string, config: Config = {}) => {
    const { isRoot } = config;

    const normalizedPath = useFieldPath(path, isRoot);

    return useCallback((value: T | ((oldValue: T) => T)) => {
        form.change(normalizedPath, value);
    }, [ form, normalizedPath ]);
};
