// material
import { Container } from '@material-ui/core';
// redux
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import BlogFormEdit from './BlogFormEdit';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function PageBlogEdit() {
  const { t } = useLocales();
  return (
    <Page title={t('blogs.edit-title')}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={t('blogs.edit')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('blogs.heading'),
              href: PATH_DASHBOARD.app.blogs.list,
            },
            { name: t('blogs.edit') },
          ]}
        />
        <BlogFormEdit />
      </Container>
    </Page>
  );
}
