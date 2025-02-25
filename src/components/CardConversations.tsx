import { Avatar } from 'antd';

// type participantsType = {
//     _id: string;
//     username: string;
// };
type CardConversationsType = {
    name: string;
    lastMessage: string;
    onClose: () => any;
};
function CardConversations({ name, lastMessage, onClose }: CardConversationsType) {
    return (
        <div onClick={onClose} style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={50}></Avatar>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '16px' }}>
                <span style={{ lineHeight: '20px', fontWeight: 'bold' }}>{name}</span>
                <p style={{ lineHeight: '20px' }}>{lastMessage}</p>
            </div>
        </div>
    );
}

export default CardConversations;
