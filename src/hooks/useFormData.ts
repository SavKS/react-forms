import get from '@savks/not-need-lodash/get';
import { useCallback, useRef } from 'react';
import { useSyncExternalStore } from 'react';

import Form from '../Form';
import useFieldPath from '../hooks/useFieldPath';

const none = Symbol('none');

function useFormData<ValueType = any>(
    form: Form,
    accessor?: string,
    config?: {
        isEqual?: (a: ValueType | undefined, b: ValueType | undefined) => boolean,
        isRoot?: boolean
    }
): ValueType | undefined;

function useFormData<ValueType = any>(
    form: Form,
    accessor: string | undefined,
    config: {
        isEqual?: (a: ValueType, b: ValueType) => boolean,
        defaultValue: ValueType,
        isRoot?: boolean
    }
): ValueType;

function useFormData<
    ValueType = any,
    FormData extends Record<string, any> = Record<string, any>
>(
    form: Form,
    accessor: (data: FormData | undefined) => ValueType,
    config?: {
        isEqual?: (a: ValueType, b: ValueType) => boolean,
        isRoot?: boolean
    }
): ValueType;

function useFormData<
    ValueType = any,
    FormData extends Record<string, any> = Record<string, any>
>(
    form: Form,
    accessor?: string | ((data: FormData | undefined) => ValueType),
    config?: {
        isEqual?: (a: ValueType | undefined, b: ValueType | undefined) => boolean,
        defaultValue?: ValueType,
        isRoot?: boolean
    }
): ValueType {
    const prevValue = useRef<ValueType | typeof none>(none);

    const { defaultValue, isRoot } = config ?? {};

    const normalizedPath = useFieldPath(
        typeof accessor === 'function' ? '' : (accessor ?? ''),
        isRoot
    );

    const getData = useCallback(() => {
        const scopedData = normalizedPath ? get(form.data, normalizedPath) : form.data;

        let result: ValueType;

        if (typeof accessor === 'function') {
            result = accessor(scopedData);
        } else {
            result = scopedData ?? defaultValue;
        }

        if (config?.isEqual) {
            const current = prevValue.current;

            if (current !== none) {
                result = config.isEqual(result, current) ? current : result;
            }
        }

        prevValue.current = result;

        return result;
    }, [ normalizedPath, form.data, accessor, config, defaultValue ]);

    return useSyncExternalStore(form.onDataChange, getData, getData);
}

export default useFormData;
