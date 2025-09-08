import { ChangeEvent, Fragment, ReactNode, useMemo } from 'react';

type Value = boolean | ChangeEvent<HTMLInputElement>;

type Payload = {
    checked: boolean,
    change: (value: Value) => void
};

export type CheckboxGroupProps<T extends Record<K, string>, K extends string> = {
    value: T[K][] | undefined,
    items: T[],
    keyBy: K,
    children: (item: T, payload: Payload) => ReactNode,
    onChange: (value: T[K][]) => void
};

export default function CheckboxGroup<T extends Record<K, string>, K extends string>(
    props: CheckboxGroupProps<T, K>
) {
    const statuses = useMemo(
        () => props.items.reduce((carry, item) => {
            carry[ item[ props.keyBy ] ] = !!props.value?.includes(item[ props.keyBy ]);

            return carry;
        }, {} as Record<string, boolean>),
        [ props.items, props.keyBy, props.value ]
    );

    const changeHandlers = useMemo(
        () => props.items.reduce<Record<string, Payload['change']>>((carry, item) => {
            carry[ item[ props.keyBy ] ] = (value: boolean | ChangeEvent<HTMLInputElement>) => {
                const index = props.value?.indexOf(item[ props.keyBy ]) ?? -1;

                const checked = typeof value === 'boolean' ? value : value.currentTarget.checked;

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
                                (_value, valueIndex) => valueIndex !== index
                            )
                        );
                    }
                }
            };

            return carry;
        }, {}),
        [ props ]
    );

    return (
        <>
            {
                props.items.map(
                    item => (
                        <Fragment key={ item[ props.keyBy ] }>
                            {
                                props.children(item, {
                                    checked: statuses[ item[ props.keyBy ] ],
                                    change: changeHandlers[ item[ props.keyBy ] ]
                                })
                            }
                        </Fragment>
                    )
                )
            }
        </>
    );
}
