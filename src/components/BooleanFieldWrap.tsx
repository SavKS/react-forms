import React from 'react';
import FieldWrap, { FieldWrapProps } from './FieldWrap';

export default function BooleanFieldWrap(props: FieldWrapProps<boolean>) {
    return <FieldWrap { ...props } typeDefaultValue={ false } />;
}
