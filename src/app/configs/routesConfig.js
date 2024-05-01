import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignUpConfig from '../main/apps/accounts/sign-up/SignUpConfig';
import ThankYouConfig from '../main/apps/accounts/thankyou/ThankYouConfig';
import OtpPageConfig from '../main/apps/accounts/otp/OtpConfig';

const routeConfigs = [
  ThankYouConfig,
  SignUpConfig,
  OtpPageConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="thank-you"/>,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="/error/404" />,
  },
];

export default routes;
