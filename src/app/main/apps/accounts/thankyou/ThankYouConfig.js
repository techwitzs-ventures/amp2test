
import authRoles from '../auth/authRoles';
import { lazy } from 'react';

const ThankYouPage = lazy(() => import('./ThankYouPage'));

const ThankYouConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.forall,
    routes: [
        {
            path: 'thank-you',
            element: <ThankYouPage />,
        },
    ],
};

export default ThankYouConfig;
