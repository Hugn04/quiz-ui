import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoute, publicRoute } from './routes/route';
import { SocketProvider } from './context/SocketContext';
import DefaultLayout from './layout/Default/DefaultLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <SocketProvider>
            <BrowserRouter>
                <Routes>
                    {publicRoute.map((item, index) => {
                        const Component = item.component;
                        const PageLayout = item.layout ?? DefaultLayout;
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <PageLayout {...item.props}>
                                        <Component></Component>
                                    </PageLayout>
                                }
                            ></Route>
                        );
                    })}
                    {privateRoute.map((item, index) => {
                        const Component = item.component;
                        const PageLayout = item.layout ?? DefaultLayout;
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <ProtectedRoute>
                                        <PageLayout {...item.props}>
                                            <Component></Component>
                                        </PageLayout>
                                    </ProtectedRoute>
                                }
                            ></Route>
                        );
                    })}
                    <Route path="*" element={<>404</>} />
                </Routes>
            </BrowserRouter>
        </SocketProvider>
    );
}

export default App;
