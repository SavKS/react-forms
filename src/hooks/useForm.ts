import { useRef } from 'react';

import Form from '../Form.js';

type Config = {
    displayName?: string
};

export default function useForm(initialData?: Record<string, any>, config?: Config) {
    const formRef = useRef<Form | null>(null);

    if (formRef.current === null) {
        formRef.current = new Form(initialData);

        formRef.current.displayName = config?.displayName;
    }

    return formRef.current;
}
