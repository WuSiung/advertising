import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export interface ConfirmProps {
    title?: string,
    content?: string,
    onOk?: Function,
    onCancel?: () => void
}

export const showConfirm = (params: ConfirmProps) => {
    const { title, content, onOk, onCancel } = params
    return new Promise((resolve: (value: boolean) => void, reject: (value: boolean) => void) => {
        Modal.confirm({
            title: title || '提示！！',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            content: content || '你确定删除？',
            onOk: async () => {
                return onOk && onOk()?.then(() => {
                    resolve(true)
                })
            },
            onCancel() {
                onCancel && onCancel()
            },
        });
    })
}
