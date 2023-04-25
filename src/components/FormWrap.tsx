import { FormEvent, ReactNode, useCallback, useMemo } from 'react';

import { ContextualSubmitContext, ContextualSubmitContextValue } from '../contexts/ContextualSubmitContext.js';
import { FormContext } from '../contexts/FormContext.js';
import { FormStatusContextProvider } from '../contexts/FormStatusContext.js';
import Form from '../Form.js';

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
