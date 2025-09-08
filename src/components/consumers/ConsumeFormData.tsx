import { ReactNode } from 'react';

import Form from '../../Form';
import useFormData from '../../hooks/useFormData';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';

export type ConsumeFormDataProps<T> = {
    form?: Form,
    path?: string,
    children: (value: T | undefined) => ReactNode
};

export default function ConsumeFormData<T = any>(props: ConsumeFormDataProps<T>) {
    const form = usePassedOrContextualForm(props.form);

    const value = useFormData(form, props.path ?? '');

    return (
        <>{ props.children(value) }</>
    );
}
