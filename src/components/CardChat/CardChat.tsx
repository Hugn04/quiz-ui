import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Divider, Input, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import styles from './CardChat.module.scss';
import classNames from 'classnames/bind';
import ItemChat from '../ItemChat';
import { removeSelected, type Conversation } from '../../redux/slices/conversationSlice';
import { useSocket } from '../../hooks/useSocket';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import type { Message } from '../../redux/slices/messageSlice';
import { addMessages, fetchMessageByConversationId } from '../../redux/slices/messageSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import request from '../../api/request';

const cx = classNames.bind(styles);

const CardChat = ({ conversation }: { conversation: Conversation }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const conversationMessage = useSelector((state: RootState) => state.message.messages);
    const message = conversationMessage.find((c) => c.conversationId === conversation._id)?.messages ?? [];

    const scrollableDivRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const socket = useSocket('getMessage', (message) => {
        console.log(message);
    });

    // useEffect(() => {
    //     dispatch(fetchMessageByConversationId(conversation._id));
    // }, []);
    const loadMoreData = () => {
        if (loading || !scrollableDivRef.current) {
            return;
        }

        const scrollableDiv = scrollableDivRef.current;
        const previousScrollHeight = scrollableDiv.scrollHeight;

        setLoading(true);
        console.log(message.length);

        request
            .get('/get-message', { params: { id: conversation._id, skip: message.length } })
            .then((res) => {
                const data: Message[] = res.data;
                if (data.length < 10) {
                    setHasMore(false);
                }
                dispatch(addMessages({ conversationId: conversation._id, messages: data }));
                setTimeout(() => {
                    if (scrollableDiv) {
                        const newScrollHeight = scrollableDiv.scrollHeight;
                        scrollableDiv.scrollTop += newScrollHeight - previousScrollHeight;
                    }
                }, 0);

                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <Avatar size={'large'}></Avatar>
                    <div style={{ marginLeft: '8px' }}>{conversation.name}</div>
                </div>
                <Button
                    shape="circle"
                    onClick={() => {
                        dispatch(removeSelected(conversation._id));
                    }}
                    icon={<CloseOutlined />}
                    size={'middle'}
                ></Button>
            </div>
            <div
                id={`scrollableDiv${conversation._id}`}
                ref={scrollableDivRef}
                style={{
                    height: 350,
                    width: 320,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    padding: '10px',
                }}
            >
                <InfiniteScroll
                    dataLength={message.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>Đã tải hết tin nhắn 🤐</Divider>}
                    scrollableTarget={`scrollableDiv${conversation._id}`}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {message &&
                            message.map((item, index) => {
                                return <ItemChat item={item} key={index}></ItemChat>;
                            })}
                    </div>
                </InfiniteScroll>
            </div>
            <div className={cx('footer')}>
                <Input></Input>
                <Button shape="circle" style={{ marginLeft: '8px' }} icon={<SendOutlined />} size={'middle'}></Button>
            </div>
        </div>
    );
};

export default CardChat;
