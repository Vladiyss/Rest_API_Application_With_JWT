import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import {Routes} from '../../constant/routes';
import {AuthContext} from "../AuthProvider";
import {signin} from '../../service/apiAuth';
import Alert from "../alert/Alert";

class Login extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {error: null}

        this.state = {
            err: '',
            email: '',
            password: '',
            signedIn: false
        };

        this.login = this.login.bind(this);
	    //this.handleChangeEmail = this.handleChangeEmail.bind(this);
	    //this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    /*handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }	  
      
    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }*/

    login(e) {
        e.preventDefault();
        const email = e.target.elements[0].value;
        const password = e.target.elements[2].value;

        //let {email, password} = this.state;
	    let user = {email, password};
	    console.log(user);
	    signin(user)
	        .then(res => {
		        if (res === undefined) {
		            console.log('No response');
		            return;
		        }
	            if (res.err) {
		            this.setState({err: res.err});
		        } else {
		            console.log(res); 
		            this.setState({signedIn: true, userId: res.user._id});
                    this.context.login(res.user);
                    this.props.history.push(Routes.facts);
		        }
	    });

        /*let resultPromise = this.context.login(email, password);
        resultPromise.then(() => {
            this.props.history.push(Routes.facts);
        }).catch(reason => {
            this.setState({error: reason.response.data.message})
        });*/
    };

    render() {
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form noValidate onSubmit={this.login}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={Routes.registration} variant='body2'>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

Login.contextType = AuthContext;
export default withRouter(Login)
