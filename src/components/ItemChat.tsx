import type { Message } from '../redux/slices/messageSlice';

type itemChatType = {
    item: Message;
};

function ItemChat({ item }: itemChatType) {
    return <div style={{ height: '50px' }}>{item.content}</div>;
}

export default ItemChat;
