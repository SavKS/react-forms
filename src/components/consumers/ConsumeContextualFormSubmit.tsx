import { useContextualFormSubmit } from '../../contexts/ContextualFormSubmitContext';

export type ConsumeContextualSubmitProps = {
    children: (submit: () => void) => void
};

export default function ConsumeContextualFormSubmit(props: ConsumeContextualSubmitProps) {
    const submit = useContextualFormSubmit();

    return props.children(submit);
}
