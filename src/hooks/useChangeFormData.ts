import { Draft, produce } from 'immer';
import { useDeepCompareCallback } from 'use-deep-compare';

import Form from '../Form';

import useScopePath from './useScopePath';

type Config = {
    errorsAutoReset?: boolean | string | string[],
    isRoot?: boolean
};

export default <T = any>(form: Form, path?: string, config: Config = {}) => {
    const scope = useScopePath(form);

    return useDeepCompareCallback((
        value:
            | Exclude<T | undefined, (...args: any[]) => any>
            | ((oldValue: Draft<T | undefined>) => Draft<T | undefined> | void | undefined)
    ) => {
        const normalizedPath = (
            (config.isRoot || !scope) ? path : (path ? `${ scope }.${ path }` : scope)
        );

        if (!normalizedPath) {
            const newValue = typeof value === 'function' ?
                produce(
                    form.data,
                    value as ((oldValue: Draft<T | undefined>) => Draft<T | undefined> | void | undefined)
                ) :
                value;

            form.change(undefined, newValue as Record<string, any>, config?.errorsAutoReset);
        } else {
            form.change(normalizedPath, value, config?.errorsAutoReset);
        }
    }, [ config?.errorsAutoReset, config.isRoot, form, path, scope ]);
};
