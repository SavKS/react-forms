import { useContextualSubmit } from '../contexts/ContextualSubmitContext';

export default function ConsumeContextualSubmit(props: {
    children: (submit: () => void) => void
}) {
    const submit = useContextualSubmit();

    return props.children(submit);
}
