import { JSX, ReactNode } from 'react';
import HomePage from '../page/HomePage';
type routeType = {
    path: string;
    component: () => JSX.Element;
    layout?: (props: { children: ReactNode }) => JSX.Element;
    props?: { [key: string]: any };
};
const publicRoute: routeType[] = [
    { path: '/', component: HomePage },
    { path: '/a', component: HomePage },
    { path: '/', component: HomePage },
    { path: '/', component: HomePage },
];
const privateRoute: routeType[] = [];
export { publicRoute, privateRoute };
