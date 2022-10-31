import get from '@savks/not-need-lodash/get';
import { useCallback } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import Form from '../Form';
import useFieldPath from '../hooks/useFieldPath';

type Config<DefaultValueType> = {
    defaultValue?: DefaultValueType,
    isRoot?: boolean
};

export default function useFormData<ValueType = any, DefaultValueType = ValueType>(
    form: Form,
    path?: string,
    config: Config<DefaultValueType> = {}
): ValueType {
    const { defaultValue, isRoot } = config;

    const normalizedPath = useFieldPath(path ?? '', isRoot);

    const getData = useCallback(
        () => form.data,
        [ form ]
    );

    return useSyncExternalStoreWithSelector(
        form.onDataChange,
        getData,
        getData,
        useCallback(
            data => (normalizedPath ? get(data, normalizedPath) : data) ?? defaultValue,
            [ normalizedPath, defaultValue ]
        )
    );
}
