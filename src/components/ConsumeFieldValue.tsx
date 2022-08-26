import React, { ReactNode } from 'react';
import useContextualForm from '../hooks/useContextualForm';
import useFormData from '../hooks/useFormData';

type Props<T> = {
    path: string,
    children: (value: T) => ReactNode
};

export default function ConsumeFieldValue<T = any>(props: Props<T>) {
    const value = useFormData(
        useContextualForm(),
        props.path
    );

    return (
        <>{ props.children(value) }</>
    );
}
