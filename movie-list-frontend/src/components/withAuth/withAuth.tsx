import React from 'react';
import { useAuth } from './useAuth';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const isAuthenticated = useAuth();

    // Don't render the component until authentication status is known
    if (isAuthenticated === null) {
      return <div><Loader></Loader>
        <Footer relativePosition={false} />
      </div>;
    }

    // If not authenticated, the hook will have already redirected
    if (isAuthenticated === false) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
