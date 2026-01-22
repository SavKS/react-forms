import { ValidationErrors } from '../types';

function extractErrors(errors: ValidationErrors, prefix: string, undefinedIfEmpty: true): ValidationErrors | undefined;

function extractErrors(errors: ValidationErrors, prefix: string): ValidationErrors;

function extractErrors(errors: ValidationErrors, prefix: string, undefinedIfEmpty?: boolean): ValidationErrors | undefined {
    const prefixRegExp = new RegExp(`^${ prefix }\\.`);

    const result = Object.entries(errors).reduce<ValidationErrors>((carry, [ key, messages ]) => {
        if (prefixRegExp.test(key)) {
            carry[ key.replace(prefixRegExp, '') ] = messages;
        }

        return carry;
    }, {});

    if (undefinedIfEmpty && !Object.keys(result).length) {
        return undefined;
    }

    return result;
}

export default extractErrors;
