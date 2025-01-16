import {
  CircularProgress,
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostCard from 'src/components/blog/PostCard';
import CommentSection from './CommentBlog';
import { getPostById } from 'src/redux/slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function BlogPageDetail() {
  const { postId } = useParams();
  const [recentPosts, setRecentPosts] = useState(null);
  const { item: currentBlog, loading } = useSelector((state) => state.blogs);
  const { list: postList } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(postId, ''));
  }, [postId]);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto', minHeight: '100vh' }}>
      <Typography variant="h3" sx={{ mt: 5, textAlign: 'center' }}>
        {currentBlog && currentBlog.title}
      </Typography>
      <Link
        to={`/search?category=${currentBlog && currentBlog.category}`}
        style={{ textDecoration: 'none', alignSelf: 'center' }}
      >
        <Button disabled variant="outlined" size="small" sx={{ mt: 2 }}>
          {currentBlog && currentBlog?.category.name}
        </Button>
      </Link>
      <Card sx={{ mt: 5 }}>
        <CardMedia
          component="img"
          image={currentBlog && currentBlog.image}
          alt={currentBlog && currentBlog.title}
          sx={{ maxHeight: '600px', objectFit: 'cover' }}
        />
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          borderBottom: '1px solid #ccc',
          pb: 1,
        }}
      >
        <Typography variant="body2">
          {currentBlog && new Date(currentBlog.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {currentBlog && (currentBlog.content.length / 1000).toFixed(0)} phút
          đọc
        </Typography>
      </Box>
      <Box
        sx={{ mt: 3 }}
        dangerouslySetInnerHTML={{ __html: currentBlog && currentBlog.content }}
      ></Box>
      {/* <Box sx={{ mt: 5 }}>
        <CallToAction />
      </Box> */}
      <CommentSection postId={postId} />
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5">Bài gần đây</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mt: 3,
          }}
        >
          {postList.length > 6
            ? postList
                .slice(0, 6)
                .map((post) => <PostCard key={post._id} post={post} />)
            : postList?.map((post) => <PostCard key={post._id} post={post} />)}
        </Box>
      </Box>
    </Box>
  );
}
