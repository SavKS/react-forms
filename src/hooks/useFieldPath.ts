import { useContext } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';

import { FormContext } from '../contexts/FormContext.js';

import useScopePath from './useScopePath.js';

function useFieldPath(path?: string, isRoot?: boolean): string;

function useFieldPath(path?: string[], isRoot?: boolean): string[];

function useFieldPath(path?: string | string[], isRoot = false): string | string[] {
    const scope = useScopePath(
        useContext(FormContext)
    );

    return useDeepCompareMemo(() => {
        if (isRoot) {
            return path ?? '';
        }

        if (!scope) {
            return path ?? '';
        }

        if (typeof path === 'string' || path === undefined) {
            return path ? `${ scope }.${ path }` : scope;
        }

        return path.map(
            item => item ? `${ scope }.${ item }` : scope
        );
    }, [ isRoot, path, scope ]);
}

export default useFieldPath;
