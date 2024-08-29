import { useMemo } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';

import useContextualForm from './useContextualForm';
import useFormFormattedErrors from './useFormFormattedErrors';

export default (paths?: string | string[]) => {
    const form = useContextualForm();

    const normalizedErrorPaths = useMemo(() => {
        if (paths === undefined) {
            return undefined;
        }

        if (typeof paths === 'string') {
            return [ paths ];
        }

        return paths;
    }, [ paths ]);

    return useFormFormattedErrors(
        form,
        useDeepCompareMemo(
            () => normalizedErrorPaths,
            [ normalizedErrorPaths ]
        )
    );
};
