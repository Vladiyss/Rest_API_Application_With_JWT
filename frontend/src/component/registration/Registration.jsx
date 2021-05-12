import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import {Routes} from '../../constant/routes';
import {AuthContext} from "../AuthProvider";
import {signup} from '../../service/apiAuth'
import Alert from "../alert/Alert";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {error: null}
    //}
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            userId: '',
            error: '',
            signedUp: false
        };

        this.registration = this.registration.bind(this);
        //this.onChangeEmail = this.onChangeEmail.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);
        //this.onChangeName = this.onChangeName.bind(this);
        //this.onChangeSurName = this.onChangeSurName.bind(this);
    }

    /*onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeSurName(e) {
        this.setState({surname: e.target.value});
    }
    
    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }
    
    onChangePassword(e) {
        this.setState({password: e.target.value});
    }*/

    registration(e) {
        e.preventDefault();

        const name = e.target.elements[0].value;
        const surname = e.target.elements[2].value;
        const email = e.target.elements[4].value;
        const password = e.target.elements[6].value;
        
        //let {name, surname, email, password} = this.state;
        let user = {name, surname, email, password};
        signup(user)
            .then(response => {
                console.log(response);
                if (!response) {
                    console.log('Cannot get response!');
                    return;
                }  

                if (response.err) {
                    this.setState({error: response.err});
                } else {
                    this.setState({signedUp: true, userId: response.userId});
                    this.context.registration(response.user);
                    this.props.history.push(Routes.facts);
                }
        
        })

        /*let resultPromise = this.context.registration(name, surname, email, password);
        resultPromise.then(() => {
            this.props.history.push(Routes.facts);
        }).catch(reason => {
            this.setState({error: reason.response.data.message})
        });*/
    };

    render() {
        return (
            <Container component="main" maxWidth="xs">
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={this.registration}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to={Routes.login} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }

}

Registration.contextType = AuthContext;
export default withRouter(Registration)
