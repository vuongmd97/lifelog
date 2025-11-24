import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import AuthenticatedApp from './AuthenticatedApp';
import UnAuthenticatedApp from './UnAuthenticatedApp';
import ErrorPage from './modules/error';
import MainLoading from './components/loaders/MainLoading';

function App() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const loading = useSelector((state) => state.auth.loading);
    const isPublicRoute = false;

    if (loading) return <MainLoading />;

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            {isPublicRoute ? (
                <>{/* Login facebook or Google */}</>
            ) : !!accessToken ? (
                <AuthenticatedApp />
            ) : (
                <UnAuthenticatedApp />
            )}
        </ErrorBoundary>
    );
}

export default App;
