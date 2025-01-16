// material
import { Stack, Button, Divider, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
// hooks
import { useSnackbar } from 'notistack';
import useAuth from '../../hooks/useAuth';
import useLocales from '../../hooks/useLocales';
// icons
import { FacebookIcon, GoogleIcon, TwitterIcon } from '../../assets';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function AuthWithSocial({ isLogin }) {
  const { t } = useLocales();
  const { googleOAuth, loginWithFaceBook, loginWithTwitter } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleGoogleLoginSuccess = async (res) => {
    const tokenId = res?.tokenId;
    await googleOAuth(tokenId);
  };

  const handleGoogleLoginFailure = (err) => {
    console.log('Google login failed', err);
    const mess = t('auth.login-failed-with', { provider: 'Google', message: err.error });
    enqueueSnackbar(mess, { variant: 'error' });
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <GoogleIcon disabled={renderProps.disabled} />
            </Button>
          )}
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />

        {/* <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={handleLoginFaceBook}
        >
          <FacebookIcon disabled />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={handleLoginTwitter}
        >
          <TwitterIcon disabled />
        </Button> */}
      </Stack>

      {isLogin && (
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('auth.or').toUpperCase()}
          </Typography>
        </Divider>
      )}
    </>
  );
}
