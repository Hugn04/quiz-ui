import { CommentOutlined, MessageFilled } from '@ant-design/icons';
import { FloatButton } from 'antd';

function BoxChat() {
    return (
        <div style={{ display: 'flex', position: 'absolute', bottom: '24px', right: '160px' }}>
            <FloatButton.Group trigger="click" type="primary" style={{ insetInlineEnd: 24 }} icon={<MessageFilled />}>
                <FloatButton
                    onClick={() => {
                        console.log(1231);
                    }}
                    icon={
                        <img
                            src="https://th.bing.com/th/id/OIP.vg41yG82qw84ziz5nS-CWQHaHa?rs=1&pid=ImgDetMain"
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '40px', // Đảm bảo Avatar chiếm hết diện tích thẻ div
                                height: '40px',
                                borderRadius: '50%',
                            }}
                        />
                    }
                />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
            <div className="box">adnj</div>
        </div>
    );
}

export default BoxChat;
