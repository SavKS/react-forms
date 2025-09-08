import { useDeepCompareMemo } from 'use-deep-compare';

import Form from '../Form';

import useScopePath from './useScopePath';

function useFormPath(form: Form, path?: string, isRoot?: boolean): string;

function useFormPath(form: Form, path?: string[], isRoot?: boolean): string[];

function useFormPath(form: Form, path?: string | string[], isRoot = false): string | string[] {
    const scope = useScopePath(form);

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

export default useFormPath;
