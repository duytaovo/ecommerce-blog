import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx, mr: 10 }}>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
      >
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill="url(#BG1)">
          <path d="M0 395.253c0 8.571 7.094 15.52 15.846 15.52 6.093 0 11.375-3.372 14.026-8.312l.5.12 25.088-32.765.394-1.049c4.693-5.413 7.53-12.418 7.53-20.076v-53.615c-22.643.04-45.07-7.187-63.384-21.059v121.236zM180.619 224.526H110.92c-6.97 0-13.41 2.21-18.643 5.946l-.283.09-28.611 21.173v-3.257a103.84 103.84 0 01-22.49-9.377C22.58 228.791 8.727 213.764 0 196.478v66.301c18.52 16.35 42.688 24.533 66.854 23.615.006.072.016.143.022.215h113.459a98.564 98.564 0 01-4.857-30.61 98.681 98.681 0 014.001-27.874 98.35 98.35 0 011.14-3.599z" />
          <path d="M45.281 231.626a95.145 95.145 0 0018.102 7.839V115.882c0-8.571-7.094-15.52-15.846-15.52-5.496 0-10.336 2.743-13.178 6.905l-.026-.007-25.09 32.765-.364.884C3.385 146.49 0 154.078 0 162.444v7.723c5.25 24.997 20.969 47.77 45.281 61.46zM190.15 307.81v87.443c0 8.571 7.094 15.52 15.846 15.52 6.032 0 11.275-3.303 13.952-8.162l24.782-32.364.07-.17c4.279-4.406 7.246-10.04 8.302-16.307-26.629-6.635-49.14-23.454-62.952-45.96zM190.15 223.944v.583h-.21a90.1 90.1 0 00-2.087 6.27 90.265 90.265 0 00-3.572 25.202 90.12 90.12 0 005.347 30.61h.522v1.431a91.862 91.862 0 0015.524 26.438c.17.203.344.404.516.606a94.264 94.264 0 0017.48 15.907 94.774 94.774 0 0029.863 13.972V167.04c-29.28 7.886-52.901 29.285-63.383 56.904z" />
          <path d="M237.687 100.362c-6.59 0-12.239 3.943-14.627 9.55l-.338-.065-24.125 31.505c-5.24 5.538-8.447 12.946-8.447 21.092v41.748c13.887-22.63 36.564-39.517 63.383-46.076v-42.234c0-8.571-7.094-15.52-15.846-15.52z" />
        </g>
        <g fill="url(#BG1)">
          <path d="M380.87 249.238L506.264 126.75l-.184-.41c2.575-2.76 4.16-6.423 4.16-10.456 0-8.572-7.095-15.52-15.847-15.52H456.1l-1.132.458c-7.893.272-15.05 3.368-20.45 8.292l-.965.391-97.019 94.769c10.143 18.775 25.57 34.402 44.337 44.963z" />
          <path d="M509.206 387.325l.14-.261-134.28-131.165c-18.792-10.906-34.38-26.562-45.033-45.274l-.658.642-.042-.04v-1.818l-.022-.037.022-.02v-77.515c0-17.144-14.19-31.042-31.692-31.042-17.503 0-31.692 13.898-31.692 31.042v80.497c41.455 9.846 72.334 46.497 72.334 90.086 0 2.305-.09 4.591-.26 6.855l96.85 94.603 1.437.525c5.116 4.013 11.527 6.503 18.524 6.773l1.265.462h40.055c8.751 0 15.846-6.949 15.846-15.52 0-3.266-1.035-6.293-2.794-8.793z" />
          <path d="M265.95 221.234v158.932c0 1.146.067 2.275.191 3.388 34.916-9.296 61.051-39.687 63.192-76.274v-6.494l.127.124c-.69-38.14-27.436-70.16-63.51-79.676z" />
          <path d="M268.305 391.914c4.73 11.317 16.08 19.293 29.336 19.293 17.503 0 31.692-13.898 31.692-31.041V341.74c-11.721 24.406-33.995 43.021-61.028 50.174z" />
        </g>
      </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        version="1.1"
        id="Layer_1"
        width="130px"
        height="80px"
      >
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <text
          x="-50"
          y="200"
          font-size="145px"
          font-weight="bold"
          className="font-bold"
          // transform="rotate(45)"
          fill="url(#BG1)"
        >
          TECHstore
        </text>

        {/* </g> */}
      </svg>
    </Box>
  );
}
