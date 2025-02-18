type itemChatType = {
    item: {
        content: string;
    };
};

function ItemChat({ item }: itemChatType) {
    return <div style={{ height: '50px' }}>{item.content}abc</div>;
}

export default ItemChat;
