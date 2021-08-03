import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useState } from 'react';
import { reset } from 'src/apiCalls/loginCalls';
import Page from '../components/Page';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));


export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [nPassword, setNPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const params = useParams()

    const handleForget = async (e) => {
        if (!password) {
            setError("Enter new password")
            return
        }
        if (!nPassword) {
            setError("Enter confirm password")
            return
        }
        if (password != nPassword) {
            setError("Password not matched")
            return
        }
        setError("")

        reset(password, params.token).then((data) => {
            if (data) {
                console.log(data);
                if (data.error) {
                    setError(data.error);
                    console.log(error);
                } else {
                    setMessage('Password rest is done. Try login now.');
                }
            } else {
                setError('Unable to Connect to Database')
            }
        })
    }



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
                                                            onChange={e => {
                                                                setPassword(e.target.value)
                                                            }}
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
                                                            onChange={e => {
                                                                setNPassword(e.target.value)
                                                            }}

                                                        />
                                                    </div>
                                                    {error &&
                                                        <p className="mt-3">
                                                            <span style={{ color: 'red' }}>{error}</span>
                                                        </p>
                                                    }
                                                    {message &&
                                                        <p className="mt-3">
                                                            <span style={{ color: 'green' }}>{message}</span>
                                                        </p>
                                                    }

                                                    <button className="btn mt-4" type="button"
                                                        onClick={handleForget}
                                                    >submit</button>
                                                    <p className="mb-0 mt-4 text-center">
                                                        <a href="/" className="link" >
                                                            Back to login
                                                        </a>
                                                    </p>

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
