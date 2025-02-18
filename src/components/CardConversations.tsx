import { Avatar, Space } from 'antd';

// type participantsType = {
//     _id: string;
//     username: string;
// };
type cardMessageType = {
    name: string;
    lastMessage: string;
    onClose: () => any;
};
function CardMessage({ name, lastMessage, onClose }: cardMessageType) {
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

export default CardMessage;
