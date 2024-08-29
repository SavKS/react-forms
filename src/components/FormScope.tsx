import { ReactNode, useMemo } from 'react';

import { ScopeContext } from '../contexts/ScopeContext';
import useContextualForm from '../hooks/useContextualForm';
import useFieldPath from '../hooks/useFieldPath';

type Props = {
    path: string,
    children: ReactNode
};

export default function FormScope(props: Props) {
    const form = useContextualForm();
    const path = useFieldPath(props.path);

    const contextValue = useMemo(
        () => ({ form, path }),
        [ form, path ]
    );

    return (
        <ScopeContext.Provider value={ contextValue }>{ props.children }</ScopeContext.Provider>
    );
}
