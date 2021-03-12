import Store from '@/utils/store';
import { Button, Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import React from 'react';

interface SearchResult {
    id: string,
    name: string
}

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<{ value: { data: SearchResult[] } }>;
    debounceTimeout?: number;
    setValue: (value: string) => void;
    onAdd?: () => void,
    defaultOptions?: []
}

function DebounceSelect<
    ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any
>({ fetchOptions, debounceTimeout = 500, ...props }: DebounceSelectProps) {
    const { setValue, onAdd, defaultOptions, ...otherProps } = props
    const [fetching, setFetching] = React.useState(false);
    const [isFetched, setIsFetched] = React.useState(false);
    const [options, setOptions] = React.useState<ValueType[]>([]);
    const fetchRef = React.useRef(0);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value: string) => {
            if (value == '') return
            setValue(value)
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            setIsFetched(true)

            fetchOptions(value).then(newOptions => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                let newArr: ValueType[] = newOptions.value.data.map(item => {
                    return { key: item.id || '', label: item.name, value: item.name } as ValueType
                })

                setOptions(newArr);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <div style={{ display: 'flex' }}>
            <Select<ValueType>
                filterOption={false}
                onSearch={debounceFetcher}
                showArrow={false}
                defaultActiveFirstOption={false}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                {...otherProps}
                options={isFetched ? options : defaultOptions}
            />
            {
                onAdd && <Button type='primary' onClick={onAdd} disabled={fetching}>添加</Button>
            }
        </div>
    );
}

export default DebounceSelect