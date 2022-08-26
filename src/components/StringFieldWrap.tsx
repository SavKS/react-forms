import React from 'react';
import FieldWrap, { FieldWrapProps } from './FieldWrap';

export default function StringFieldWrap(props: FieldWrapProps<string, string | undefined | null>) {
    return <FieldWrap{ ...props } typeDefaultValue={ '' } />;
}
