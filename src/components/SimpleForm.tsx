import React, { ReactNode } from 'react';

import { useContextualSubmit } from '../contexts/ContextualSubmitContext.js';

type Props = {
    className?: string,
    children: ReactNode
} & Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>;

export default function SimpleForm(props: Props) {
    const submit = useContextualSubmit();

    return (
        <form
            { ...props }
            onSubmit={ submit }
        >
            { props.children }

            <button hidden />
        </form>
    );
}
