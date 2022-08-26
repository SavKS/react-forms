import React, { FormEvent, ReactNode, useCallback, useMemo } from 'react';
import { ContextualSubmitContext, ContextualSubmitContextValue } from '../contexts/ContextualSubmitContext';
import { FormContext } from '../contexts/FormContext';
import { FormStatusContextProvider } from '../contexts/FormStatusContext';
import Form from '../Form';

type Props = {
    form: Form,
    children: ReactNode | ((args: {
        form: Form,
        submit: ContextualSubmitContextValue
    }) => ReactNode),
    onSubmit?: (form: Form) => any
};

export default function FormWrap(props: Props) {
    const submit = useCallback((event?: FormEvent) => {
        event?.preventDefault();

        props.onSubmit?.call(null, props.form);
    }, [ props.form, props.onSubmit ]);

    const payload = useMemo(
        () => ({
            form: props.form,
            submit
        }),
        [ props.form, submit ]
    );

    return (
        <FormContext.Provider value={ props.form }>
            <ContextualSubmitContext.Provider value={ submit }>
                <FormStatusContextProvider form={ props.form }>
                    {
                        typeof props.children === 'function' ?
                            props.children(payload) :
                            props.children
                    }
                </FormStatusContextProvider>
            </ContextualSubmitContext.Provider>
        </FormContext.Provider>
    );
}
