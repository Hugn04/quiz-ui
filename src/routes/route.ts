import { Fragment, JSX, ReactNode } from 'react';
import HomePage from '../page/HomePage';
import Chat from '../components/Test';
type routeType = {
    path: string;
    component: () => JSX.Element;
    layout?: any;
    props?: { [key: string]: any };
};
const publicRoute: routeType[] = [
    { path: '/', component: HomePage },
    { path: '/a', component: Chat, layout: Fragment },
    { path: '/', component: HomePage },
    { path: '/', component: HomePage },
];
const privateRoute: routeType[] = [];
export { publicRoute, privateRoute };
