import { Drawer, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useSocket } from '../../hooks/useSocket';
import { memo, useEffect, useState } from 'react';
import CardConversations from '../CardConversations';
import { useDispatch } from 'react-redux';
import {
    addConversationToGroup,
    getAllConversation,
    setSelectConversation,
} from '../../redux/slices/conversationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
type MenuItem = Required<MenuProps>['items'][number];

const Chat = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => any }) => {
    const conversations = useSelector((state: RootState) => state.conversation.conversations);

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const dispatch = useDispatch();

    const handleChooseConversation = (conversationId: string) => {
        dispatch(addConversationToGroup(conversationId));
        dispatch(setSelectConversation(conversationId));
        onClose();
    };

    useSocket('getConversations', (conversation) => {
        dispatch(getAllConversation(conversation));
    });

    // Cập nhật menuItems khi conversations thay đổi
    useEffect(() => {
        const newMenuItems = conversations.map((conversation) => ({
            key: conversation._id,
            label: (
                <CardConversations onClose={() => {}} name={conversation.name} lastMessage={conversation.lastMessage} />
            ),
            style: { display: 'flex', alignItems: 'center', height: '70px' },
            onClick: () => {
                handleChooseConversation(conversation._id);
            },
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
