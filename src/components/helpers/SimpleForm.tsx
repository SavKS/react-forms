import React, { ReactNode, Ref } from 'react';

import { useContextualFormSubmit } from '../../contexts/ContextualFormSubmitContext';
import Form from '../../Form';

type Props = {
    form?: Form,
    className?: string,
    children: ReactNode
} & Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>;

export default function SimpleForm(props: Props, ref?: Ref<HTMLFormElement>) {
    const submit = useContextualFormSubmit();

    return (
        <form
            ref={ ref }
            { ...props }
            onSubmit={ submit }
        >
            { props.children }

            <button
                type="submit"
                hidden
            />
        </form>
    );
}
