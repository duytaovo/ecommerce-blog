import { Container } from '@material-ui/core';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useLocales from '../../../hooks/useLocales';
import BlogsForm from './PostForm';

// ----------------------------------------------------------------------

export default function PagePost() {
  const { t } = useLocales();
  return (
    <Page title={t('blogs.add-title')}>
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={t('blogs.heading-create')}
          links={[
            { name: t('dashboard.title'), href: PATH_DASHBOARD.root },
            {
              name: t('dashboard.management'),
              href: PATH_DASHBOARD.app.root,
            },
            {
              name: t('blogs.heading'),
              href: PATH_DASHBOARD.app.blogs.list,
            },
            { name: t('blogs.add') },
          ]}
        />
        <BlogsForm />
      </Container>
    </Page>
  );
}
