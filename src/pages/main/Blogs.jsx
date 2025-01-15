import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Container } from '@mui/material';
import PostCard from 'src/components/blog/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { getListPost } from 'src/redux/slices/blogSlice';
import { Spinner } from 'flowbite-react';

export default function BlogsPage() {
  const dispatch = useDispatch();
  const {
    list: postList,
    isLoading,
  } = useSelector((state) => state.blogs);

 useEffect(() => {
    dispatch(getListPost(''));
 }, [dispatch]);

  return (
    <Box>
      {/* Welcome Section */}
      <Container maxWidth="lg" sx={{ pt: 8, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Chào mừng đến với Blog của tôi
        </Typography>
        {/* <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: '600px', mx: 'auto' }}
        >
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </Typography>
        <Button
          component={Link}
          to="/search"
          variant="contained"
          color="primary"
          sx={{ fontSize: '0.875rem', textTransform: 'none' }}
        >
          Xem tất cả
        </Button> */}
      </Container>

      {/* Call to Action Section */}
      {/* <Box sx={{ py: 4, bgcolor: 'amber.100', darkBgColor: 'grey.800' }}>
        <CallToAction />
      </Box> */}

      {/* Recent Posts Section */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {isLoading && <Spinner/>}
        {postList && postList.length > 0 && (
          <Box>
            <Typography
              variant="h4"
              fontWeight="medium"
              textAlign="center"
              gutterBottom
            >
              Bài đăng gần đây
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {postList.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                component={Link}
                to="/search"
                color="primary"
                sx={{ fontSize: '1rem', textTransform: 'none' }}
              >
                Xem tất cả
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
