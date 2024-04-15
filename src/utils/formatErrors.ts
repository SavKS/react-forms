import { ValidationErrors } from '../types.js';

import filterErrors from './filterErrors.js';

export default (errors: ValidationErrors, names?: string | string[], delimiter = ' '): string | undefined => {
    const filteredErrors = Object.values(
        filterErrors(errors, names)
    ).flat();

    if (!filteredErrors.length) {
        return undefined;
    }

    return filteredErrors.join(delimiter);
};
