import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TableHead,
    TablePagination,
} from '@material-ui/core';
// components
import Page from './Page';
import Scrollbar from './Scrollbar';
import { UserListHead } from './_dashboard/user';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' }
];

// ----------------------------------------------------------------------

export default function UserTable() {
    return (
        <Page title="Admin | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Add
                    </Button>
                </Stack>

                <Card>

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }} style={{ borderRadius: 0 }}>
                            <Table >
                                <TableHead>
                                    <Typography variant="h6" id="tableTitle" component="div" px={4} py={2}>
                                        User
                                    </Typography>
                                </TableHead>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERLIST.length}
                                />
                                <TableBody>
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        role="checkbox"
                                    >

                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography variant="subtitle2" noWrap>
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">nkjnk</TableCell>
                                        <TableCell align="left">kk</TableCell>
                                        <TableCell align="left">knkn</TableCell>
                                    </TableRow>
                                    <TableRow style={{ height: 53 }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    );
}
