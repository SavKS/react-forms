import React, { ReactNode, forwardRef } from 'react';

import { useContextualSubmit } from '../contexts/ContextualSubmitContext';

type Props = {
    className?: string,
    children: ReactNode
} & Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>;

const SimpleForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
    const submit = useContextualSubmit();

    return (
        <form
            ref={ ref }
            { ...props }
            onSubmit={ submit }
        >
            { props.children }

            <button hidden />
        </form>
    );
});

SimpleForm.displayName = 'SimpleForm';

export default SimpleForm;
