// icons
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
//
import PropTypes from 'prop-types';
import { useState } from 'react';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// material
import { Box, Tooltip, IconButton, DialogActions, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//
import { MButton } from '../@material-extend';
import { DialogAnimate } from '../animate';
import InvoicePDF from './InvoicePDF';

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object
};

export default function InvoiceToolbar({ invoice }) {
  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  return (
    <>
      {/* <Stack mb={5} direction="row" justifyContent="flex-end" spacing={1.5}> */}
      {/*  <MButton color="error" size="small" variant="contained" endIcon={<Icon icon={shareFill} />}> */}
      {/*    Share */}
      {/*  </MButton> */}

      {/*  <MButton */}
      {/*    color="info" */}
      {/*    size="small" */}
      {/*    variant="contained" */}
      {/*    onClick={handleOpenPreview} */}
      {/*    endIcon={<Icon icon={eyeFill} />} */}
      {/*    sx={{ mx: 1 }} */}
      {/*  > */}
      {/*    Preview */}
      {/*  </MButton> */}

      {/*  <PDFDownloadLink */}
      {/*    document={<InvoicePDF invoice={invoice} />} */}
      {/*    fileName={`INVOICE-${invoice?._id}`} */}
      {/*    style={{ textDecoration: 'none' }} */}
      {/*  > */}
      {/*    {({ loading }) => ( */}
      {/*      <LoadingButton */}
      {/*        size="small" */}
      {/*        loading={loading} */}
      {/*        variant="contained" */}
      {/*        loadingPosition="end" */}
      {/*        endIcon={<Icon icon={downloadFill} />} */}
      {/*      > */}
      {/*        Download */}
      {/*      </LoadingButton> */}
      {/*    )} */}
      {/*  </PDFDownloadLink> */}
      {/* </Stack> */}

      <div>haha</div>
    </>
  );
}
