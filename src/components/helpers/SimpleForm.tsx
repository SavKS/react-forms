import React, { ReactNode, forwardRef } from 'react';

import { useContextualFormSubmit } from '../../contexts/ContextualFormSubmitContext';
import Form from '../../Form';

type Props = {
    form?: Form,
    className?: string,
    children: ReactNode
} & Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>;

const SimpleForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
    const submit = useContextualFormSubmit();

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
