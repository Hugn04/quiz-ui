import { ReactNode, useState } from 'react';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Header from '../../components/Header';
import Chat from '../../components/Chat/Chat';
import BoxChat from '../../components/BoxChat';
type DefaultLayoutProps = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

function DefaultLayout({ children }: DefaultLayoutProps) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className={cx('container')}>
            <Header showDrawer={showDrawer}></Header>
            <Chat isOpen={open} onClose={onClose}></Chat>
            <BoxChat></BoxChat>
            {children}
        </div>
    );
}

export default DefaultLayout;
