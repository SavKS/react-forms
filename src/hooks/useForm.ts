import { useRef } from 'react';
import Form from '../Form';

export default function useForm(initialData?: Record<string, any>) {
    const formRef = useRef<Form | null>(null);

    if (formRef.current === null) {
        formRef.current = new Form(initialData);
    }

    return formRef.current;
}
