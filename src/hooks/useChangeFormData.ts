import produce from 'immer';
import { useCallback, useContext } from 'react';
import { ScopeContext } from '../contexts/ScopeContext';
import Form from '../Form';

type Config = {
    isRoot?: boolean
};

export default <T = any>(form: Form, path?: string, config: Config = {}) => {
    const scope = useContext(ScopeContext);

    return useCallback((value: T | ((oldValue: T) => T)) => {
        const normalizedPath = (config.isRoot || !scope) ?
            path :
            (path ? `${ scope }.${ path }` : scope);

        if (!normalizedPath) {
            const newValue = typeof value === 'function' ?
                produce(form.data, draft => {
                    (value as (oldValue: T) => T)(draft as T);
                }) :
                value;

            form.setData(newValue, false);
        } else {
            form.change(normalizedPath, value);
        }
    }, [ config.isRoot, form, path, scope ]);
};
