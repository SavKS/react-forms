import { ValidationErrors } from '../types';

export default (errors: ValidationErrors, prefix: string) => {
    const prefixRegExp = new RegExp(`^${prefix}\.`);

    return Object.entries(errors).reduce((carry, [ key, messages ]) => {
        if (prefixRegExp.test(key)) {
            carry[ key.replace(prefixRegExp, '') ] = messages;
        }

        return carry;
    }, {} as ValidationErrors);
};
