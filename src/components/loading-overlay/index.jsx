import PropTypes from 'prop-types';
import LoadingOverlay from '@ronchalant/react-loading-overlay';
import NProgress from 'nprogress';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

import Logo from '../Logo';

import './style.css';

const nprogressStyle = makeStyles((theme) => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    }
  }
}));

const RootStyle = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent'
}));

const CustomSpinner = () => {
  nprogressStyle();

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);
  return (
    <RootStyle>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeatDelay: 1,
          repeat: Infinity
        }}
      >
        <Logo sx={{ width: 64, height: 64 }} />
      </motion.div>

      <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 100,
          height: 100,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`
        }}
      />

      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 120,
          height: 120,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`
        }}
      />
    </RootStyle>
  );
};

function CustomLoadingOverlay({ active }) {
  return <LoadingOverlay spinner={<CustomSpinner />} active={active} />;
}

CustomLoadingOverlay.propTypes = {
  active: PropTypes.bool
};

export default CustomLoadingOverlay;
