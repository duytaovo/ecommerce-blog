import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from 'src/components/blog/Comment';
import { getAccountInfo } from 'src/redux/slices/accountSlice';
import {
  addComment,
  getComments,
  likeComment,
  deleteComment,
} from 'src/api'; // import API functions

export default function CommentSection({ postId }) {
  const { info: accountInfo } = useSelector((state) => state.account);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const {data} = await getComments(postId);
        setComments(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const {data} = await addComment({
        content: comment,
        postId,
        userId: accountInfo._id,
      });
      setComment('');
      setCommentError(null);
      setComments([data, ...comments]);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!accountInfo) {
        navigate('/sign-in');
        return;
      }
      const data = await likeComment(commentId);
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    setShowDialog(false);
    try {
      if (!accountInfo) {
        navigate('/sign-in');
        return;
      }
      await deleteComment(commentToDelete);
      setComments(
        comments.filter((comment) => comment._id !== commentToDelete)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ margin: '0 auto' }}>
      {accountInfo ? (
        <Box display="flex" alignItems="center" gap={1} my={2}>
          <Typography variant="body2">Đăng nhập với tư cách:</Typography>
          <Link to={'/dashboard?tab=profile'}>
            <Typography variant="body2" color="primary">
              @{accountInfo.username}
            </Typography>
          </Link>
        </Box>
      ) : (
        <Typography variant="body2" color="primary">
          Bạn cần đăng nhập để bình luận. <Link to="/sign-in">Đăng nhập</Link>
        </Typography>
      )}

      {accountInfo && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Thêm bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            helperText={`${200 - comment.length} ký tự còn lại`}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={comment.length === 0}
            >
              Gửi
            </Button>
          </Box>
        </form>
      )}

      {comments?.length === 0 ? (
        <Typography variant="body2" mt={2}>
          Chưa có bình luận nào!
        </Typography>
      ) : (
        <>
          <Box my={2} alignItems="center">
            <Typography variant="body2">Bình luận</Typography>
            <Typography variant="body2">Tổng: {comments.length}</Typography>
          </Box>
          {comments?.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onDelete={(commentId) => {
                setShowDialog(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Xóa Bình Luận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa bình luận này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
            Có, xóa
          </Button>
          <Button onClick={() => setShowDialog(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
