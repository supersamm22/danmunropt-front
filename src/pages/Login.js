import { experimentalStyled as styled } from '@material-ui/core/styles';
import Page from '../components/Page';
import { LoginForm } from '../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login">
      <LoginForm />
    </RootStyle>
  );
}
