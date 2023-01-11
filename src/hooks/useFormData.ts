import get from '@savks/not-need-lodash/get';
import { useCallback } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import Form from '../Form';
import useFieldPath from '../hooks/useFieldPath';

function useFormData<ValueType = any>(
    form: Form,
    accessor?: string,
    config?: {
        defaultValue?: ValueType,
        isRoot?: boolean
    }
): ValueType | undefined;

function useFormData<
    ValueType = any,
    FormData extends Record<string, any> = Record<string, any>
>(
    form: Form,
    accessor: (data: FormData | undefined) => ValueType,
    config?: {
        isRoot?: boolean
    }
): ValueType | undefined;

function useFormData<
    ValueType = any,
    FormData extends Record<string, any> = Record<string, any>
>(
    form: Form,
    accessor?: string | ((data: FormData | undefined) => ValueType),
    config?: {
        defaultValue?: ValueType,
        isRoot?: boolean
    }
): ValueType {
    const { defaultValue, isRoot } = config ?? {};

    const normalizedPath = useFieldPath(
        typeof accessor === 'function' ? '' : (accessor ?? ''),
        isRoot
    );

    const getData = useCallback(
        () => form.data,
        [ form ]
    );

    return useSyncExternalStoreWithSelector(
        form.onDataChange,
        getData,
        getData,
        useCallback(data => {
            const scopedData = normalizedPath ? get(data, normalizedPath) : data;

            if (typeof accessor === 'function') {
                return accessor(scopedData);
            }

            return scopedData ?? defaultValue;
        }, [ normalizedPath, defaultValue, accessor ])
    );
}

export default useFormData;
