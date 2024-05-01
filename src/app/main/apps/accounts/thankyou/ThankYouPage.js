import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import JwtService from '../auth/services/jwtService';

function ThankYouPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h1"
            className="mt-48 sm:mt-96 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
          >
            Thank You!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
          >
            Registration Completed, click below to login.
          </Typography>
        </motion.div>

        <Link className="block font-normal mt-48" to={`https://${process.env.REACT_APP_APP_URL}.${process.env.REACT_APP_HOST_NAME}/`} onClick={() => JwtService.logout()}>
          Login to Agroshub
        </Link>
      </div>
    </div>
  );
}

export default ThankYouPage;
