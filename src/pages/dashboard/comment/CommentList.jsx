import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocales } from 'src/hooks';
import { deletePost, getListPost } from 'src/redux/slices/blogSlice';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import Scrollbar from 'src/components/Scrollbar';

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { MTableHead } from 'src/components/@material-extend/table';
import EmptyCard from 'src/components/EmptyCard';
import { ThumbImgStyle } from 'src/components/@styled';
import { fDateTime } from 'src/utils/formatTime';
import { MCircularProgress } from 'src/components/@material-extend';
import { BlogMoreMenu } from 'src/components/dashboard/blogs';
import { getAccountInfo } from 'src/redux/slices/accountSlice';
import { getCommentsAll } from 'src/api';

export default function PageCommentList() {
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { info: accountInfo } = useSelector((state) => state.account);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [isCompact, setIsCompact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        const { data } = await getCommentsAll();
        setComments(data?.comments);
        setIsLoading(false)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, []);

  const tableHeads = [
    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Ngày cập nhật',
    },
    {
      id: 'content',
      numeric: false,
      disablePadding: false,
      label: 'Nội dụng bình luận',
    },
    {
      id: 'likeNumber',
      disablePadding: true,
      label: 'Số lượt thích',
    },
    {
      id: 'user',
      disablePadding: true,
      label: 'Người bình luận',
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
    },
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = comments.map((n) => n._id);
      setSelected(newSelected);
      if (selected.count === 1) {
        setCurrentId(comments[comments.indexOf(selected[0])]._id);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={tableHeads.length + 1}>
              <Box
                height={200}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MCircularProgress size={100} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    if (comments?.length > 0) {
      return (
        <TableBody>
          {comments?.map((row, index) => {
            if (!row) return;
            const { _id, content, numberOfLikes, updatedAt, userId } = row;
            const isItemSelected = isSelected(_id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={_id}
                selected={isItemSelected}
                onClick={(event) => handleClick(event, _id)}
              >
                <TableCell padding="none">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell align="center" padding="none" style={{ width: 175 }}>
                  {fDateTime(updatedAt, currentLang.value)}
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  style={{
                    // paddingLeft: 0,
                  }}
                  // padding="normal"
                >
                  {content}
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  // padding="normal"
                >
                  {numberOfLikes}
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  // padding="normal"
                >
                  {userId?.username}
                </TableCell>
                <TableCell
                  align="right"
                  onClick={(event) => event.stopPropagation()}
                >
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    }
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeads.length + 1}>
            <EmptyCard title={'Không tìm thấy bình luận nào'} />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  const handleDeletePost = async (_id) => {
    try {
      await dispatch(deletePost(_id, accountInfo._id));
      await dispatch(getListPost(accountInfo._id));
      enqueueSnackbar(t('commentBlog.delete'), { variant: 'success' });
    } catch (e) {
      enqueueSnackbar(t('commentBlog.error'), { variant: 'error' });
    }
  };

  return (
    <Page title={t('commentBlog.page-title')}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={t('commentBlog.heading')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root,
            },
            { name: t('commentBlog.heading') },
          ]}
        />
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size={isCompact ? 'small' : 'medium'}>
                <MTableHead
                  headLabel={tableHeads}
                  numSelected={selected.length}
                  rowCount={comments.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                {renderTableBody()}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <Box sx={{ position: 'relative' }}>
            <TablePagination
              labelRowsPerPage={t('common.rows-per-page')}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={comments.length}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box> */}
        </Card>
      </Container>
    </Page>
  );
}
