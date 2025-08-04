import { Draft, produce } from 'immer';
import { useCallback, useRef } from 'react';
import { useDeepCompareCallback, useDeepCompareEffect } from 'use-deep-compare';

import Form from '../Form';

import useScopePath from './useScopePath';

type Config = {
    errorsAutoReset?: boolean | string | string[],
    isRoot?: boolean
};

export default <T = any>(form: Form, path?: string, config: Config = {}) => {
    const scope = useScopePath(form);

    const getForm = useCallback(
        () => form,
        [ form ]
    );

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
                    getForm().data,
                    value as ((oldValue: Draft<T | undefined>) => Draft<T | undefined> | void | undefined)
                ) :
                value;

            getForm().change(
                undefined,
                newValue as Record<string, any>,
                config?.errorsAutoReset
            );
        } else {
            getForm().change(
                normalizedPath,
                value,
                config?.errorsAutoReset
            );
        }
    }, [ config?.errorsAutoReset, config.isRoot, getForm, path, scope ]);
};
