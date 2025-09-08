import Form from '../../Form';
import { ChangeFormDataConfig } from '../../hooks/useChangeFormData';
import usePassedOrContextualForm from '../../hooks/usePassedOrContextualForm';
import { useChangeFormData } from '../../index';

export type ConsumeChangeFormDataProps<T> = {
    form?: Form,
    path?: string,
    config?: ChangeFormDataConfig,
    children: (change: ReturnType<typeof useChangeFormData<T>>) => void
};

export default function ConsumeChangeFormData<T = any>(props: ConsumeChangeFormDataProps<T>) {
    const form = usePassedOrContextualForm(props.form);

    const change = useChangeFormData<T>(form, props.path, props.config);

    return <>{ props.children(change) }</>;
}
