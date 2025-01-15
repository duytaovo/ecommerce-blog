import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, Typography, Box } from '@mui/material';
import { getAccountInfo } from 'src/redux/slices/accountSlice';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
const { info: accountInfo } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        fontSize: '0.875rem',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
            {accountInfo ? `@${accountInfo.username}` : 'anonymous user'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </Box>
        {isEditing ? (
          <>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              multiline
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography color="textSecondary" sx={{ pb: 1 }}>
              {comment.content}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pt: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
                gap: 2,
              }}
            >
              <Button
                size="small"
                startIcon={<FaThumbsUp />}
                sx={{
                  color:
                    accountInfo && comment.likes.includes(accountInfo._id)
                      ? 'primary.main'
                      : 'text.secondary',
                }}
                onClick={() => onLike(comment._id)}
              >
                {comment.numberOfLikes > 0
                  ? `${comment.numberOfLikes} ${
                      comment.numberOfLikes === 1 ? 'like' : 'likes'
                    }`
                  : 'Like'}
              </Button>
              {accountInfo &&
                (accountInfo._id === comment.userId || accountInfo.isAdmin) && (
                  <>
                    <Button
                      size="small"
                      onClick={handleEdit}
                      sx={{ color: 'text.secondary' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onDelete(comment._id)}
                      sx={{ color: 'error.main' }}
                    >
                      Delete
                    </Button>
                  </>
                )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
