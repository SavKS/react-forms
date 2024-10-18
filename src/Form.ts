import get from '@savks/not-need-lodash/get';
import set from '@savks/not-need-lodash/set';
import unset from '@savks/not-need-lodash/unset';
import { dequal } from 'dequal';
import { produce } from 'immer';
import isPlainObject from 'is-plain-obj';
import wildcardMatch from 'wildcard-match';

import { ValidationErrors } from './types';

type Subscriber<T> = (newValue: T) => void;

type SubscribersMap<T> = Map<T, T>;

type SubscriberTypes = {
    data: Subscriber<Record<string, any>>,
    isProcessing: Subscriber<boolean>,
    isLocked: Subscriber<boolean>,
    isModified: Subscriber<boolean>,
    errors: Subscriber<ValidationErrors>
};

type Subscribers = {
    data: SubscribersMap<SubscriberTypes['data']>,
    isProcessing: SubscribersMap<SubscriberTypes['isProcessing']>,
    isLocked: SubscribersMap<SubscriberTypes['isLocked']>,
    isModified: SubscribersMap<SubscriberTypes['isModified']>,
    errors: SubscribersMap<SubscriberTypes['errors']>
};

export type Config = {
    dataType?: 'json' | 'formData',
    dataFilter?: (value: any, key: string) => boolean,
    errorsAutoReset?:
        | boolean
        | string
        | RegExp
        | Array<string | RegExp>
        | ((path: string) => boolean)
};

const defaultFilterFunction = (value: any) => value !== undefined && value !== null;

class Form {
    displayName: string | undefined;

    #config: Config;
    #errors: ValidationErrors;
    #data: Record<string, any>;
    #initialData: Record<string, any>;
    #files: Record<string, File[]>;
    #isProcessing: boolean;
    #isLocked: boolean;
    #isModified: boolean;

    #subscribers: Subscribers;

    constructor(initialData = {}, config?: Config) {
        this.#config = {
            dataType: config?.dataType ?? 'json',
            dataFilter: config?.dataFilter ?? defaultFilterFunction,
            errorsAutoReset: config?.errorsAutoReset
        };

        this.#subscribers = {
            data: new Map,
            isProcessing: new Map,
            isLocked: new Map,
            isModified: new Map,
            errors: new Map
        };

        this.#errors = {};
        this.#data = initialData;
        this.#initialData = initialData;
        this.#files = {};

        this.#isProcessing = false;
        this.#isLocked = false;

        this.#isModified = false;
    }

    get data() {
        return this.#data;
    }

    get initialData() {
        return this.#initialData;
    }

    get errors(): ValidationErrors {
        return this.#errors;
    }

    get isProcessing(): boolean {
        return this.#isProcessing;
    }

    get isLocked(): boolean {
        return this.#isLocked;
    }

    get isModified(): boolean {
        return this.#isModified;
    }

    updateConfig(config: Config): void;

    updateConfig<K extends keyof Config>(key: K, value: Config[K]): void;

    updateConfig(key: string | Config, value?: any) {
        if (typeof key === 'object') {
            this.#config = key;
        } else {
            this.#config[ key as keyof Config ] = value;
        }
    }

    onDataChange = (callback: SubscriberTypes['data']) => {
        this.#subscribers.data.set(callback, callback);

        return () => {
            this.#subscribers.data.delete(callback);
        };
    };

    onIsLockedChange = (callback: SubscriberTypes['isLocked']) => {
        this.#subscribers.isLocked.set(callback, callback);

        return () => {
            this.#subscribers.isLocked.delete(callback);
        };
    };

    onIsProcessingChange = (callback: SubscriberTypes['isProcessing']) => {
        this.#subscribers.isProcessing.set(callback, callback);

        return () => {
            this.#subscribers.isProcessing.delete(callback);
        };
    };

    onIsModifiedChange = (callback: SubscriberTypes['isModified']) => {
        this.#subscribers.isModified.set(callback, callback);

        return () => {
            this.#subscribers.isModified.delete(callback);
        };
    };

    onErrorsChange = (callback: SubscriberTypes['errors'], isImmediate = false) => {
        this.#subscribers.errors.set(callback, callback);

        if (this.#errors && isImmediate) {
            callback(this.#errors);
        }

        return () => {
            this.#subscribers.errors.delete(callback);
        };
    };

    markAsProcessing() {
        this.#isProcessing = true;

        this.#triggerIsProcessingChange();
    }

    removeProcessingMark() {
        this.#isProcessing = false;

        this.#triggerIsProcessingChange();
    }

    lock() {
        this.#isLocked = true;

        this.#triggerIsLockedChange();
    }

    unlock() {
        this.#isLocked = false;

        this.#triggerIsLockedChange();
    }

    fillFile(event: Event, name: string): void {
        if (!event.target) {
            return;
        }

        const target = event.target as HTMLInputElement;

        name = name || target.name;

        if (target.multiple) {
            name = `${ name }[]`;
        }

        const files = target.files as File[] | null;

        this.#files = Array.from(files ?? []).reduce(
            (carry: Record<string, File[]>, file: File) => {
                carry[ name ].push(file);

                return carry;
            },
            {
                ...this.#files,

                [ name ]: []
            }
        );
    }

    removeFile(name: string): void {
        delete this.#files[ name ];
    }

    hasErrors(names: string | string[]): boolean {
        const normalizedNames = [ names ].flat();

        if (normalizedNames.length === 0) {
            return Object.keys(this.errors).length > 0;
        }

        return normalizedNames.some(
            (name: string) => !!this.errors[ name ]
        );
    }

    reset(): void {
        this.setData({});

        this.#files = {};

        this.#errors = {};
    }

    resolve<V = any>(path: string, defaultValue?: V) {
        return get(this.#data, path, defaultValue);
    }

    change(
        path: string | undefined,
        value: any | ((oldValue: any) => any),
        errorsAutoReset?: Config['errorsAutoReset']
    ) {
        this.#data = produce(this.#data, draft => {
            const newValue = (
                typeof value === 'function'
                    ? value(
                        path ? get(draft, path) : draft
                    )
                    : value
            );

            if (path) {
                set(draft, path, newValue);
            } else {
                return newValue;
            }
        });

        this.#triggerDataChange();
        this.#toggleAsIsModified(true);

        errorsAutoReset ??= this.#config.errorsAutoReset;

        if (errorsAutoReset) {
            if (errorsAutoReset === true) {
                this.clearErrors(path ?? undefined);
            } else {
                this.clearErrors(errorsAutoReset);
            }
        }
    }

    fill(data: Record<string, any>) {
        this.#data = produce(this.#data, draft => {
            Object.entries(data).forEach(([ field, value ]) => {
                draft[ field ] = value;
            });
        });

        this.#triggerDataChange();
        this.#toggleAsIsModified(true);
    }

    delete(key: string) {
        this.#data = produce(this.#data, draft => {
            unset(draft, key);
        });

        this.#triggerDataChange();
        this.#toggleAsIsModified(true);
    }

    setData(data: Record<string, any>, remember = true) {
        this.#data = data;

        if (remember) {
            this.remember();
        }

        this.#triggerDataChange();
        this.clearErrors();
    }

    requestData() {
        const filterFunction = this.#config.dataFilter ?? defaultFilterFunction;

        const data = Object.entries(
            JSON.parse(
                JSON.stringify(this.#data)
            )
        ).reduce((carry, [ key, value ]) => {
            if (filterFunction(value, key)) {
                carry[ key ] = value;
            }

            return carry;
        }, {} as Record<string, any>);

        return this.#preparePostData(data, this.#files);
    }

    setErrors(errors: ValidationErrors) {
        this.#errors = errors;

        this.#triggerErrorsChange();
    }

    clearErrors(path?: string | RegExp | Array<string | RegExp> | ((path: string) => boolean)) {
        if (path) {
            const paths = [ path ].flat();

            this.#errors = Object.fromEntries(
                Object.entries(this.#errors).filter(
                    ([ key ]) => !paths.some(path => {
                        if (typeof path === 'string') {
                            return wildcardMatch(path)(key);
                        }

                        if (typeof path === 'function') {
                            return path(key);
                        }

                        return path.test(key);
                    })
                )
            );
        } else {
            this.#errors = {};
        }

        this.#triggerErrorsChange();
    }

    remember() {
        this.#initialData = structuredClone(this.#data);

        this.#toggleAsIsModified(false);

        return this;
    }

    restore(path?: string | string[]) {
        if (path) {
            const paths = [ path ].flat();

            this.setData(
                produce(this.#data, draft => {
                    paths.forEach(path => {
                        const newValue = get(this.#initialData, path);

                        set(draft, path, newValue);
                    });

                    return draft;
                })
            );
        } else {
            this.setData(this.#initialData);
        }

        return this;
    }

    hasChanges(field?: string) {
        if (!this.#initialData) {
            return false;
        }

        let oldValue, currentValue;

        if (!field) {
            oldValue = this.#initialData;
            currentValue = this.#data;
        } else {
            oldValue = get(this.#initialData, field);
            currentValue = get(this.#data, field);
        }

        return !dequal(oldValue, currentValue);
    }

    #preparePostData(
        data: Record<string, any>,
        fileFields: Record<string, File[]> = {}
    ) {
        if (this.#config.dataType === 'formData') {
            const formData = new FormData();

            Object.entries(fileFields).forEach(([ name, files ]) => {
                files.forEach(file => {
                    formData.append(name, file, file.name);
                });
            });

            Object.entries(data).forEach(([ name, value ]) => {
                if (Array.isArray(value)) {
                    value.forEach((item, key) => {
                        formData.append(`${ name }[${ key }]`, item);
                    });
                } else if (isPlainObject(value)) {
                    Object.entries(value).forEach(([ key, item ]) => {
                        formData.append(`${ name }[${ key }]`, item as any);
                    });
                } else {
                    formData.append(name, value);
                }
            });

            return formData;
        }

        if (Object.values(fileFields).length) {
            throw new Error('To send files you need to set "dataType" as "formData"');
        }

        return data;
    }

    #triggerDataChange() {
        this.#subscribers.data.forEach(callback => {
            callback(this.#data);
        });
    }

    #triggerErrorsChange() {
        this.#subscribers.errors.forEach(callback => {
            callback(this.#errors);
        });
    }

    #triggerIsLockedChange() {
        this.#subscribers.isLocked.forEach(callback => {
            callback(this.#isLocked);
        });
    }

    #triggerIsProcessingChange() {
        this.#subscribers.isProcessing.forEach(callback => {
            callback(this.#isProcessing);
        });
    }

    #toggleAsIsModified(flag: boolean) {
        this.#isModified = flag;

        this.#subscribers.isModified.forEach(callback => {
            callback(this.#isModified);
        });
    }
}

export default Form;
