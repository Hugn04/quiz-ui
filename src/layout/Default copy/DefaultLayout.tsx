import { ReactNode } from 'react';

type DefaultLayoutProps = {
    children: ReactNode;
    [key: string]: any;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            hello123
            {children}
        </>
    );
}

export default DefaultLayout;
