import { ReactNode, useMemo } from 'react';

import { FormScopeContext } from '../contexts/FormScopeContext';
import Form from '../Form';
import useFormPath from '../hooks/useFormPath';
import usePassedOrContextualForm from '../hooks/usePassedOrContextualForm';

type Props = {
    form?: Form,
    path: string,
    children: ReactNode
};

export default function FormScope(props: Props) {
    const form = usePassedOrContextualForm(props.form);
    const path = useFormPath(form, props.path);

    const contextValue = useMemo(
        () => ({ form, path }),
        [ form, path ]
    );

    return (
        <FormScopeContext value={ contextValue }>{ props.children }</FormScopeContext>
    );
}
