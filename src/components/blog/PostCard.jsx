import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';

export default function PostCard({ post }) {
  return (
    <Card
      sx={{
        maxWidth: 430,
        width: '100%',
        height: 400,
        border: '1px solid',
        borderColor: 'teal',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s',
        ':hover': {
          borderWidth: '2px',
        },
      }}
    >
      <Box component={Link} to={`/blog/${post._id}`} sx={{ display: 'block' }}>
        <CardMedia
          component="img"
          image={post.image}
          alt="Post cover"
          sx={{
            height: 260,
            width: '100%',
            objectFit: 'cover',
            transition: 'height 0.3s',
            ':hover': {
              height: 200,
            },
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          noWrap
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
        >
          {post.title}
        </Typography>
        <Typography variant="body2" fontStyle="italic" color="text.secondary">
          {post.category.name}
        </Typography>
        <Button
          component={Link}
          to={`/blog/${post._id}`}
          variant="outlined"
          sx={{
            transition: 'all 0.3s',
            ':hover': {
              bottom: 0,
              bgcolor: 'teal',
              color: 'white',
            },
          }}
        >
          Đọc bài
        </Button>
      </CardContent>
    </Card>
  );
}
