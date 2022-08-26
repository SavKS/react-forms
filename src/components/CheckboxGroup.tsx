import React, { ReactNode, useMemo } from 'react';

type Payload = {
    checked: boolean,
    change: (value: boolean) => void
};

type Props = {
    value: any[] | undefined,
    items: any[],
    keyBy: string,
    children: (item: any, payload: Payload) => ReactNode,
    onChange: (value: any[]) => void
};

export default function CheckboxGroup(props: Props) {
    const statuses = useMemo(
        () => props.items.reduce((carry, item) => {
            carry[ item[ props.keyBy ] ] = !!props.value?.includes(item[ props.keyBy ]);

            return carry;
        }, {} as Record<string, boolean>),
        [ props.items, props.keyBy, props.value ]
    );

    const changeHandlers = useMemo(
        () => props.items.reduce((carry, item) => {
            carry[ item[ props.keyBy ] ] = (checked: boolean) => {
                const index = props.value?.indexOf(item[ props.keyBy ]) ?? -1;

                if (checked) {
                    if (index === -1) {
                        props.onChange?.([
                            ...(props.value ?? []),

                            item[ props.keyBy ]
                        ]);
                    }
                } else {
                    if (index !== -1) {
                        props.onChange?.(
                            (props.value ?? []).filter(
                                (value, valueIndex) => valueIndex !== index
                            )
                        );
                    }
                }
            };

            return carry;
        }, {} as Record<string, boolean>),
        [ props ]
    );

    return (
        <>
            {
                props.items.map(
                    item => (
                        <React.Fragment key={ item[ props.keyBy ] }>
                            {
                                props.children(item, {
                                    checked: statuses[ item[ props.keyBy ] ],
                                    change: changeHandlers[ item[ props.keyBy ] ]
                                })
                            }
                        </React.Fragment>
                    )
                )
            }
        </>
    );
}
