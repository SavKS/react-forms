import { useMemo } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';

import Form from '../Form';

import useFormFormattedErrors from './useFormFormattedErrors';

export default (form: Form, paths?: string | string[]) => {
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
