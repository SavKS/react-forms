import { FormEvent, ReactNode, useMemo } from 'react';

import { ContextualFormSubmitContext, ContextualFormSubmitContextValue } from '../contexts/ContextualFormSubmitContext';
import { FormContext } from '../contexts/FormContext';
import Form from '../Form';
import useEvent from '../hooks/useEvent';

type Props = {
    form: Form,
    children: ReactNode | ((args: {
        form: Form,
        submit: ContextualFormSubmitContextValue
    }) => ReactNode),
    onSubmit?: (form: Form) => any
};

export default function FormWrap(props: Props) {
    const submit = useEvent((event?: FormEvent) => {
        event?.preventDefault();

        props.onSubmit?.call(null, props.form);
    });

    const payload = useMemo(
        () => ({
            form: props.form,
            submit
        }),
        [ props.form, submit ]
    );

    return (
        <FormContext value={ props.form }>
            <ContextualFormSubmitContext value={ submit }>
                {
                    typeof props.children === 'function' ?
                        props.children(payload) :
                        props.children
                }
            </ContextualFormSubmitContext>
        </FormContext>
    );
}
