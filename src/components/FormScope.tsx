import { ReactNode } from 'react';
import { ScopeContext } from '../contexts/ScopeContext';
import useFieldPath from '../hooks/useFieldPath';

type Props = {
    path: string,
    children: ReactNode
};

export default function FormScope(props: Props) {
    const path = useFieldPath(props.path);

    return (
        <ScopeContext.Provider value={ path }>{ props.children }</ScopeContext.Provider>
    );
}
