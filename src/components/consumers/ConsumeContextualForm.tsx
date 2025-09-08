import Form from '../../Form';
import useContextualForm from '../../hooks/useContextualForm';

export type ConsumeContextualFormProps = {
    optional?: boolean,
    children: (form: Form) => void
};

export default function ConsumeContextualForm(props: ConsumeContextualFormProps) {
    const submit = useContextualForm();

    return props.children(submit);
}
