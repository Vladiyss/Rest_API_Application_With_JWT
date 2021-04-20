import {RestRequest} from "./requestService";
import {endPoints} from "../constant/endPoints";
import jwt_decode from "jwt-decode";

const getUserFromStorage = () => {
    /*let userName = localStorage.getItem('User name');
    let userSurname = localStorage.getItem('User surname');
    let userEmail = localStorage.getItem('User email');
    let userID = localStorage.getItem('User id');
    if (!userName && !userSurname && !userEmail && !userID) return null;

    let user = {
        name: userName,
        surname: userSurname,
        email: userEmail,
        id: userID
    };
    return user;*/

    let token = localStorage.getItem('Jwt token');
    if (!token) {
        return null;
    }
    
    let data = jwt_decode(token);
    let user = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email
    };
    return user;
};
/*
const storeUser = (currentUser) => {
    localStorage.setItem('User name', currentUser.name);
    localStorage.setItem('User surname', currentUser.surname);
    localStorage.setItem('User email', currentUser.email);
    localStorage.setItem('User id', currentUser.id);
}

const afterLogin = response => {
    if (response.data.registratedUser) {
        storeUser(response.data.registratedUser);
    }

    if (response.data.signedInUser) {
        storeUser(response.data.signedInUser);
    }
    return response;
};
const registration = (name, surname, email, password) =>
    RestRequest.post(endPoints.registration, {}, {name, surname, email, password})
        .then(afterLogin);

const login = (email, password) =>
    RestRequest.post(endPoints.login, {}, {email, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('User name');
    localStorage.removeItem('User surname');
    localStorage.removeItem('User email');
    localStorage.removeItem('User id');
};
*/
const afterLogin = response => {
    if (response.data.token) {
        localStorage.setItem('Jwt token', `${response.data.token}`);
    }
    return response;
};

const registration = (name, surname, email, password) =>
    RestRequest.post(endPoints.registration, {}, {name, surname, email, password})
        .then(afterLogin);

const login = (email, password) =>
    RestRequest.post(endPoints.login, {}, {email, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('Jwt token');
};

export default {
    login,
    getUserFromStorage,
    registration,
    logout
}
