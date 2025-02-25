import classNames from 'classnames/bind';
import type { Message } from '../../redux/slices/messageSlice';
import styles from './ItemChat.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Tooltip } from 'antd';
import getDate from '../../helper/getDate';
type itemChatType = {
    item: Message;
    nextItem: Message;
};

const cx = classNames.bind(styles);

function ItemChat({ item, nextItem }: itemChatType) {
    const userId = useSelector((state: RootState) => state.user.user);
    return (
        <div
            className={cx('container', {
                right: userId?._id == item.senderId._id,
                bottom: item.senderId._id != nextItem?.senderId._id,
            })}
        >
            <Tooltip placement="left" title={getDate(item.createdAt)}>
                <div className={cx('content')}>{item.content}</div>
            </Tooltip>
        </div>
    );
}

export default ItemChat;
