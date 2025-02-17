// icon
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
//
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { paramCase } from 'change-case';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { useLocales } from '../../../hooks';
import { PATH_DASHBOARD } from '../../../routes/paths';
import DialogConfirm from '../../dialog/DialogConfirm';

// ----------------------------------------------------------------------

BlogMoreMenu.propTypes = {
  blogId: PropTypes.string,
  blogName: PropTypes.string,
  onDelete: PropTypes.func
};

export default function BlogMoreMenu({ blogId, blogName, onDelete }) {
  const { t } = useLocales();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [textConfirmDelete, setTextConfirmDelete] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    const text = t('blogs.confirm-delete', { nameInfo: blogName });
    setTextConfirmDelete(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogName]);


  const handleDelete = () => {
    setOpenDialogConfirm(true);
    setIsOpen(false);
  };

  const handleDeleteSuccess = () => {
    onDelete();
    setOpenDialogConfirm(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{ sx: { width: 200, maxWidth: '100%' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.app.blogs.root}/update-post/${paramCase(blogId)}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t('common.edit')}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t('common.delete')}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
      <DialogConfirm
        open={openDialogConfirm}
        setOpen={setOpenDialogConfirm}
        handleSubmit={handleDeleteSuccess}
        textContent={textConfirmDelete}
      />
    </>
  );
}
