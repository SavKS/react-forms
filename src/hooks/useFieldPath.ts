import { useMemoCompare } from '@savks/react-helpers';
import { useContext } from 'react';
import { ScopeContext } from '../contexts/ScopeContext';

export default function useFieldPath(path: string, isRoot?: boolean): string;

export default function useFieldPath(path: string[], isRoot?: boolean): string[];

export default function useFieldPath(path: string | string[], isRoot = false): string | string[] {
    const scope = useContext(ScopeContext);

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
