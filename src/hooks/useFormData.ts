import get from '@savks/not-need-lodash/get';
import { useEffect, useState } from 'react';
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

    const [ value, setValue ] = useState(
        () => normalizedPath ? get(form.data, normalizedPath) : form.data
    );

    useEffect(
        () => form.onDataChange((newValue) => {
            setValue(
                normalizedPath ? get(newValue, normalizedPath) : newValue
            );
        }),
        [ form, normalizedPath ]
    );

    useEffect(() => {
        setValue(
            normalizedPath ? get(form.data, normalizedPath) : form.data
        );
    }, [ form, normalizedPath ]);

    return value ?? defaultValue;
}
