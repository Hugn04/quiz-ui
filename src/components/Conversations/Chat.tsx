import { Drawer, Menu } from 'antd';
import CardMessage from '../CardConversations';
import type { MenuProps } from 'antd';
import { useSocket } from '../../hooks/useSocket';
import { memo, useEffect, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];
type participantsType = {
    _id: string;
    username: string;
};
type conversationsType = {
    _id: string;
    isGroup: boolean;
    name: string;
    participants: participantsType[];
    createdAt: string;
    lastMessage: string;
};

const Chat = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => any }) => {
    const [conversations, setConversations] = useState<conversationsType[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useSocket('getConversations', (conversation) => {
        setConversations(conversation);
    });

    // Cập nhật menuItems khi conversations thay đổi
    useEffect(() => {
        const newMenuItems = conversations.map((conversation) => ({
            key: conversation._id,
            label: <CardMessage onClose={() => {}} name={conversation.name} lastMessage={conversation.lastMessage} />,
            style: { display: 'flex', alignItems: 'center', height: '70px' },
            onClick: onClose,
        }));
        setMenuItems(newMenuItems);
    }, [conversations, onClose]); // Chạy lại khi conversations thay đổi

    return (
        <Drawer title="Đoạn chat" onClose={onClose} open={isOpen}>
            <Menu items={menuItems} /> {/* Menu được render từ `menuItems` */}
        </Drawer>
    );
};

export default memo(Chat);
