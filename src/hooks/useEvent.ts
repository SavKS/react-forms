import { useCallback, useLayoutEffect, useRef } from 'react';

const assert = () => {
    throw new Error('The "useEvent" function can\'t be called from render function');
};

export default <T extends (...args: any[]) => any>(fn: T): T => {
    const ref = useRef<T>(assert as any);

    useLayoutEffect(() => {
        ref.current = fn;
    });

    return useCallback(
        (...args: Parameters<T>): ReturnType<T> => ref.current(...args),
        []
    ) as T;
};
