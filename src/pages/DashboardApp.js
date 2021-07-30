import { Box, Grid, Container, Typography } from '@material-ui/core';
import MessocycleTable from 'src/components/messocycle/MessocycleTable';
// components
import Page from '../components/Page';

export default function DashboardApp() {
  return (
    <Page title="Daniel Munro | Dashboard">
      <Container maxWidth="xl">
        <MessocycleTable />
      </Container>
    </Page>
  );
}
