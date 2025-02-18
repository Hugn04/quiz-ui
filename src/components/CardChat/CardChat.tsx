import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Divider, Input, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import styles from './CardChat.module.scss';
import classNames from 'classnames/bind';
import ItemChat from '../ItemChat';

const cx = classNames.bind(styles);
interface Message {
    content: string;
}

const CardChat = ({ id }: { id: number }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Message[]>([]);
    const scrollableDivRef = useRef<HTMLDivElement | null>(null);

    const loadMoreData = () => {
        if (loading || !scrollableDivRef.current) {
            return;
        }

        const scrollableDiv = scrollableDivRef.current;
        const previousScrollHeight = scrollableDiv.scrollHeight; // Lưu chiều cao trước khi load dữ liệu

        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((body) => {
                setData((prevData) => {
                    console.log(body);

                    const newData = [...body, ...prevData];

                    setTimeout(() => {
                        if (scrollableDiv) {
                            const newScrollHeight = scrollableDiv.scrollHeight;
                            scrollableDiv.scrollTop += newScrollHeight - previousScrollHeight; // Giữ nguyên vị trí cuộn
                        }
                    }, 0);

                    return newData;
                });

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
                    <div style={{ marginLeft: '8px' }}>Nguyễn Văn Hùng</div>
                </div>
                <Button shape="circle" icon={<CloseOutlined />} size={'middle'}></Button>
            </div>
            <div
                id={`scrollableDiv${id}`}
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
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>Đã tải hết tin nhắn 🤐</Divider>}
                    scrollableTarget={`scrollableDiv${id}`}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {data.map((item, index) => {
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
