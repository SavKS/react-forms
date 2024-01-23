import { Draft, produce } from 'immer';
import { useCallback } from 'react';

import Form from '../Form.js';

import useScopePath from './useScopePath.js';

type Config = {
    isRoot?: boolean
};

export default <T = any>(form: Form, path?: string, config: Config = {}) => {
    const scope = useScopePath(form);

    return useCallback((
        value:
            | Exclude<T | undefined, (...args: any[]) => any>
            | ((oldValue: Draft<T | undefined>) => Draft<T | undefined> | void | undefined)
    ) => {
        const normalizedPath = (config.isRoot || !scope) ?
            path :
            (path ? `${ scope }.${ path }` : scope);

        if (!normalizedPath) {
            const newValue = typeof value === 'function' ?
                produce(
                    form.data,
                    value as ((oldValue: Draft<T | undefined>) => Draft<T | undefined> | void | undefined)
                ) :
                value;

            form.setData(newValue as Record<string, any>, false);
        } else {
            form.change(normalizedPath, value);
        }
    }, [ config.isRoot, form, path, scope ]);
};
