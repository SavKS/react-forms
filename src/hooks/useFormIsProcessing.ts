import { useEffect, useState } from 'react';
import Form from '../Form';

export default function useFormIsProcessing(form: Form) {
    const [ isProcessing, setIsProcessing ] = useState(
        () => form.isProcessing
    );

    useEffect(
        () => form.onIsProcessingChange((newValue) => {
            setIsProcessing(newValue);
        }),
        [ form ]
    );

    return isProcessing;
}
