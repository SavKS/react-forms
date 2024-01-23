import { useContext } from 'react';

import { ScopeContext } from '../contexts/ScopeContext.js';
import Form from '../Form.js';

export default (form: Form) => {
    const scopeContext = useContext(ScopeContext);
    
    return scopeContext && scopeContext.form === form ? scopeContext.path : undefined;
};
