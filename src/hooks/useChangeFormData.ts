import produce, { Draft } from 'immer';
import { useCallback, useContext } from 'react';
import { ScopeContext } from '../contexts/ScopeContext';
import Form from '../Form';

type Config = {
    isRoot?: boolean
};

export default <T = any>(form: Form, path?: string, config: Config = {}) => {
    const scope = useContext(ScopeContext);

    return useCallback((value: Exclude<T, (...args: any[]) => any> | ((oldValue: Draft<T>) => Draft<T> | void | undefined)) => {
        const normalizedPath = (config.isRoot || !scope) ?
            path :
            (path ? `${ scope }.${ path }` : scope);

        if (!normalizedPath) {
            const newValue = typeof value === 'function' ?
                produce(form.data, value as ((oldValue: Draft<T>) => Draft<T> | void | undefined)) :
                value;

            form.setData(newValue as Record<string, any>, false);
        } else {
            form.change(normalizedPath, value);
        }
    }, [ config.isRoot, form, path, scope ]);
};
