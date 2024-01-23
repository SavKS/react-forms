import { useMemoCompare } from '@savks/react-helpers';

import useContextualForm from './useContextualForm.js';
import useScopePath from './useScopePath.js';

function useFieldPath(path: string, isRoot?: boolean): string;

function useFieldPath(path: string[], isRoot?: boolean): string[];

function useFieldPath(path: string | string[], isRoot = false): string | string[] {
    const scope = useScopePath(
        useContextualForm()
    );

    return useMemoCompare(() => {
        if (isRoot) {
            return path;
        }

        if (!scope) {
            return path;
        }

        if (typeof path === 'string') {
            return path ? `${ scope }.${ path }` : scope;
        }

        return path.map(
            item => item ? `${ scope }.${ item }` : scope
        );
    }, [ isRoot, path, scope ]);
}

export default useFieldPath;
