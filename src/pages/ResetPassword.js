import { experimentalStyled as styled } from '@material-ui/core/styles';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
    return (
        <RootStyle title="Reset Password">
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <img src="/logo.png" alt="dan logo" className="logo-img" />
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <form className="section text-center" noValidate>
                                                    <h4 className="mb-4 pb-3">Reset Password</h4>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            name="newpassword"
                                                            className="form-style"
                                                            placeholder="New Password"
                                                            id="newpassword"
                                                            required
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            name="confirmpassword"
                                                            className="form-style"
                                                            placeholder="Confirm Password"
                                                            required
                                                            id="confirmpasswords"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <button className="btn mt-4">submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </RootStyle>
    );
}
