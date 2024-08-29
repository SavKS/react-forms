import { useContext } from 'react';

import { ScopeContext } from '../contexts/ScopeContext';
import Form from '../Form';

export default (form?: Form) => {
    const scopeContext = useContext(ScopeContext);

    return scopeContext && form && scopeContext.form === form ? scopeContext.path : undefined;
};
