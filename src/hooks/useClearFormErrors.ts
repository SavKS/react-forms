import { useCallback } from 'react';

import Form from '../Form.js';

import useScopePath from './useScopePath.js';

export default function useClearFormErrors(form: Form, path?: string | string[], config?: {
    isRoot?: boolean
}) {
    const scope = useScopePath(form);

    return useCallback(() => {
        const resultScope = config?.isRoot ? undefined : scope;

        if (!path) {
            form.clearErrors(resultScope);

            return;
        }

        const paths = [ path ].flat().map(
            path => resultScope ? `${ resultScope }.${ path }` : path
        );

        form.clearErrors(paths);
    }, [ config?.isRoot, form, path, scope ]);
}
