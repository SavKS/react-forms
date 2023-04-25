import { useMemoCompare } from '@savks/react-helpers';
import { useMemo } from 'react';

import useContextualForm from '../useContextualForm.js';
import useFormFormattedErrors from '../useFormFormattedErrors.js';

export default (paths: string | string[]) => {
    const form = useContextualForm();

    const normalizedErrorPaths = useMemo(() => {
        if (typeof paths === 'string') {
            return [ paths ];
        }

        return paths;
    }, [ paths ]);

    return useFormFormattedErrors(
        form,
        useMemoCompare(() => normalizedErrorPaths, [ normalizedErrorPaths ])
    );
};
