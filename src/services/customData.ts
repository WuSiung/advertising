import request from '@/utils/request';

export type CustomDataType = {
    key: string;
    value: string
};

export async function customData(params: CustomDataType) {
    return request('/ads/advtext/putKey', {
        method: 'POST',
        data: params,
    });
}

export async function getCustomData(key: string) {
    return request('/ads/advtext/getKey/' + key);
}
