import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {endPoints} from "../../constant/endPoints";
import {createFact} from "../../service/apiFact";
import {withRouter} from 'react-router-dom';
import {Routes} from "../../constant/routes";
import {RestRequest} from "../../service/requestService";
import Card from "@material-ui/core/Card";
import Axios from "axios";

class CreateFact extends React.Component {
    constructor() {
        super();
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    state = {
        file: null
    }

    onChangeFile(e) {
        this.factData.set('filedata', e.target.files[0]);
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.factData.set('title', event.target.elements[0].value);
        this.factData.set('content', event.target.elements[1].value);

        createFact(this.factData)
	        .then(response => {
                console.log(response);
		        if (response.err) {
                    console.log(response.err);   
			        return;
		        }

		        this.props.history.push(Routes.facts);
		    });
        //const title = event.target.elements[0].value;
        //const content = event.target.elements[1].value;
        //const imageName = this.state.file;
        //this.factData.append('title', event.target.elements[0].value);
        //this.factData.append('content', event.target.elements[1].value);
        //this.factData.append('filedata', this.state.file);
        //RestRequest.post(endPoints.postFact, {}, {title, content, imageName})
        //RestRequest.post(endPoints.postFact, {}, this.factData)
        /*Axios.post(endPoints.postFact,
            this.factData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then((response) => {
                this.props.history.push(Routes.facts);
            }).catch(reason => {
            //if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            this.props.history.push(Routes.login)
        });*/
    };

    componentDidMount() {
        this.factData = new FormData();
    }

    /*onImageSelection = (event) => {
        //let file = event.target.files[0];
        //this.setState({file: file})
        this.factData.set('filedata', event.target.files[0]);
    }*/

    render() {
        return (
            <Container maxWidth="sm">
                <Box m={6}>
                    <Card>
                        <form noValidate autoComplete='off' onSubmit={this.onSubmit}>

                            <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="center"
                            >
                                <Box m={4}>
                                    <Grid item>
                                        <TextField id='title' label='title'/>
                                    </Grid>
                                </Box>
                                <Box m={4}>
                                    <Grid>
                                        <TextareaAutosize id='content'
                                                          aria-label='empty textarea'
                                                          placeholder='content'
                                                          rowsMin={4}/>
                                    </Grid>
                                </Box>

                                <label>
                                Upload file:
                                <input type="file" name="filedata" onChange={this.onChangeFile} required/><br/>
                                </label>

                                <Box m={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Grid>
                        </form>
                    </Card>
                </Box>
            </Container>
        )
    }
}

export default withRouter(CreateFact);
