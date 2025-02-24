import { MessageFilled } from '@ant-design/icons';
import { FloatButton } from 'antd';
import CardChat from '../CardChat';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setSelectConversation } from '../../redux/slices/conversationSlice';

function BoxChat() {
    const groupSelectConversation = useSelector((state: RootState) => state.conversation.groupSelectConversation);
    const selectConversation = useSelector((state: RootState) => state.conversation.selectedConversation);

    const dispatch = useDispatch();
    return (
        <div style={{ display: 'flex', position: 'absolute', bottom: '24px', right: '80px' }}>
            <FloatButton.Group trigger="click" type="primary" style={{ insetInlineEnd: 24 }} icon={<MessageFilled />}>
                {groupSelectConversation.map((conversation) => {
                    return (
                        <FloatButton
                            key={conversation._id}
                            onClick={() => {
                                dispatch(setSelectConversation(conversation._id));
                            }}
                            icon={
                                conversation.name
                                // <img
                                //     src="https://th.bing.com/th/id/OIP.vg41yG82qw84ziz5nS-CWQHaHa?rs=1&pid=ImgDetMain"
                                //     style={{
                                //         position: 'absolute',
                                //         top: '0',
                                //         left: '0',
                                //         width: '40px',
                                //         height: '40px',
                                //         borderRadius: '50%',
                                //     }}
                                // />
                            }
                        />
                    );
                })}
            </FloatButton.Group>
            <div style={{ display: 'flex' }}>
                {selectConversation.map((conversation) => {
                    return <CardChat key={conversation._id} conversation={conversation}></CardChat>;
                })}
            </div>
        </div>
    );
}

export default BoxChat;
