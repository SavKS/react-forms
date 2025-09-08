import { useContext } from 'react';

import { FormScopeContext } from '../contexts/FormScopeContext';
import Form from '../Form';

export default (form: Form | undefined) => {
    const scopeContext = useContext(FormScopeContext);

    return scopeContext && form && scopeContext.form === form ? scopeContext.path : undefined;
};
