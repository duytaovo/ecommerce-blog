import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  experimentalStyled as styled,
  useTheme,
} from '@material-ui/core/styles';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  Link,
  Button,
} from '@material-ui/core';
// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/slices/categorySlice';
// components
import { QuillEditor } from '../../../components/editor';
import { UploadSingleFile } from '../../../components/upload';
import { MIconButton } from '../../../components/@material-extend';
// others
import useLocales from '../../../hooks/useLocales';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { allowImageMineTypes } from '../../../constants/imageMineTypes';
import { firebaseUploadSingle } from '../../../helper/firebaseHelper';
import { createPost, getPostById } from 'src/redux/slices/blogSlice';
import { getAccountInfo } from 'src/redux/slices/accountSlice';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

BlogsFormEdit.propTypes = {};

export default function BlogsFormEdit() {
  const theme = useTheme();
  const { t } = useLocales();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(-1);
  const [validationThumbnail, setValidationThumbnail] = useState(false);
  const [validationCategory, setValidationCategory] = useState(false);
  const { info: accountInfo } = useSelector((state) => state.account);
  const { id } = useParams();
  const { item: currentBlog } = useSelector((state) => state.blogs);
  const { list: categoriesList } = useSelector((state) => state?.category);
  console.log(currentBlog);
  console.log(categoriesList);
  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
      dispatch(getPostById(id, accountInfo._id));
  }, [id]);

  useEffect(() => {
    setUploadImage(currentBlog?.image);
  }, [currentBlog]);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const uploadFile = acceptedFiles[0];
    if (uploadFile) {
      if (allowImageMineTypes.indexOf(uploadFile.type) < 0) {
        enqueueSnackbar(t('common.invalid-file-type'), {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        return;
      }
      uploadFile.preview = URL.createObjectURL(uploadFile);
      setUploadImage(uploadFile);
    }
  }, []);

  const validationCustomer = () => {
    // if (!uploadImage) {
    //   setValidationThumbnail(true);
    // }

    if (!values.category) {
      setValidationCategory(true);
    }

    return !!(uploadImage && values.category);
  };

  const handleSave = () => {
    // if (validationCustomer()) {

    if (!uploadImage || typeof uploadImage === 'string') {
      // if (typeof uploadImage === 'string') {
      try {
        const blogsData = handleAddDataForblogs(uploadImage);
        dispatch(createPost(blogsData));
        enqueueSnackbar(t('blogs.add-success'), {
          variant: 'success',
        });
        navigate(PATH_DASHBOARD.app.blogs.list);
      } catch (e) {
        enqueueSnackbar(t('blogs.error'), {
          variant: 'error',
        });
      }
      // }
    }
    firebaseUploadSingle(
      uploadImage,
      'blogs',
      setUploadPercent,
      (error) => {
        enqueueSnackbar(error, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      },
      (url) => {
        try {
          const blogsData = handleAddDataForblogs(url);
          dispatch(createPost(blogsData));
          enqueueSnackbar(t('blogs.add-success'), {
            variant: 'success',
          });
          navigate(PATH_DASHBOARD.app.blogs.list);
        } catch (e) {
          enqueueSnackbar(t('blogs.error'), {
            variant: 'error',
          });
        }
      }
    );
    // }
  };

  const handleAddDataForblogs = (url) => {
    const blogs = {
      title: values.title,
      content: values.content,
      category: values.category,
      image: url ? url : undefined,
      userId: accountInfo._id,
    };
    return blogs;
  };

  const Newblogschema = Yup.object().shape({
    title: Yup.string().required(t('blogs.title-validation')),
    content: Yup.string().required(t('blogs.desc-validation')),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentBlog?.title || '',
      content: currentBlog?.content || '',
      category: currentBlog?.category || '',
      image: currentBlog?.image || '',
      userId: currentBlog?.userId || '',
    },
    validationSchema: Newblogschema,
    onSubmit: async () => {
      handleSave();
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label={t('blogs.title')}
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <div>
                    <LabelStyle>{t('blogs.desc')}</LabelStyle>
                    <QuillEditor
                      id="toolbar"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.description && errors.description}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div onChange={() => setValidationThumbnail(false)}>
                    <UploadSingleFile
                      label={t('blogs.image')}
                      file={uploadImage}
                      setFile={setUploadImage}
                      onDrop={handleDropSingleFile}
                      uploadPercent={uploadPercent}
                      accepted="image/*"
                      maxSize={3145728}
                      error={Boolean(validationThumbnail)}
                    />
                    {validationThumbnail && (
                      <FormHelperText error sx={{ px: 2 }}>
                        Thumbnail is required
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {currentBlog?.category !== undefined && (
                    <Autocomplete
                      fullWidth
                      defaultValue={categoriesList.find(
                        (category) => category._id === currentBlog?.category // Set the default value by matching _id
                      )}
                      options={categoriesList.filter(
                        (x) => !x.isHide && x._id !== currentBlog?.category // Filter categories
                      )}
                      getOptionLabel={(option) => option.name} // Use the name of the category as the label
                      value={categoriesList.find(
                        (c) => c._id === currentBlog?.category // Find the category with the matching _id
                      )}
                      onChange={(e, newValue) => {
                        setFieldValue('category', newValue?._id); // Update the category field value to the selected category's _id
                        setValidationCategory(false); // Reset any validation error
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('blogs.category')}
                          margin="none"
                          error={Boolean(validationCategory)} // Show error if validationCategory is true
                        />
                      )}
                    />
                  )}
                </Stack>
              </Card>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                {t('blogs.save')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
