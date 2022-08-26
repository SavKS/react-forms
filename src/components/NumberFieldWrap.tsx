import React from 'react';
import FieldWrap, { FieldWrapProps } from './FieldWrap';

export default function NumberFieldWrap(props: FieldWrapProps<number | undefined>) {
    return <FieldWrap{ ...props } typeDefaultValue={ undefined }></FieldWrap>;
}
