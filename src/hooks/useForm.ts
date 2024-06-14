import { useEffect, useRef } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';

import Form, { Config as FormConfig } from '../Form.js';

type Config = { displayName?: string } & FormConfig;

export default function useForm(initialData?: Record<string, any>, config?: Config) {
    const currentConfig = useDeepCompareMemo(
        () => config,
        [ config ]
    );

    const formRef = useRef<Form | null>(null);

    if (formRef.current === null) {
        formRef.current = new Form(initialData, currentConfig);

        formRef.current.displayName = currentConfig?.displayName;
    }

    useEffect(() => {
        if (formRef.current) {
            formRef.current.updateConfig(currentConfig ?? {});
        }
    }, [ currentConfig ]);

    return formRef.current;
}
