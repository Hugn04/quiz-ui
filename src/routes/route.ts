import { Fragment, JSX, ReactNode } from 'react';
import HomePage from '../page/HomePage';
import Chat from '../components/Test';
import Login from '../page/Login';
import Register from '../page/Register';
type routeType = {
    path: string;
    component: () => JSX.Element;
    layout?: any;
    props?: { [key: string]: any };
};
const publicRoute: routeType[] = [
    { path: '/a', component: Chat, layout: Fragment },
    { path: '/login', component: Login, layout: Fragment },
];
const privateRoute: routeType[] = [
    { path: '/', component: HomePage },
    { path: '/register', component: Register, layout: Fragment },
];
export { publicRoute, privateRoute };
