import wildcardMatch from 'wildcard-match';

import { ValidationErrors } from '../types.js';

export default (errors: ValidationErrors, names?: string | string[]) => {
    const normalizedNames = names ? [ names ].flat() : [];

    if (!normalizedNames?.length) {
        return errors;
    }

    return Object.entries(errors).reduce((carry, [ key, errors ]) => {
        const isMatch = normalizedNames.some(
            normalizedName => wildcardMatch(normalizedName)(key)
        );

        if (isMatch) {
            carry[ key ] = errors;
        }

        return carry;
    }, {} as ValidationErrors);
};
