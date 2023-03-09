import axios from 'axios';
import { updateSession } from "./store/system/actions";
import { getHomeTechnicians } from './store/technicians-home-list/actions';
import setAuthToken from '../src/setAuthToken';
import { UPDATE_SESSION } from '../src/store/system/types';


export const thunkLogin = (
    data
  ) => async dispatch => {
    try {
        const res = await axios.post('http://192.168.1.113:5000/auth/signin', data);
        
        if(res.data.jwt){
            setAuthToken(res.data.jwt)
            localStorage.setItem('jwtToken', res.data.jwt);
            localStorage.setItem('user', JSON.stringify(res.data));
        }

        dispatch(
            updateSession({
                verified: true,
                loggedIn: true,
                user: res.data,
                success: true,
                error: false,
                message: ""
            })
        );
    } catch (err) {
        let msg = ""
        console.log(err.response.data.message)

        if(err.response?.data?.message){
            if(err.response?.data.message === "Your account is not Activated ! check your mail to active your account."){
                msg = "Votre compte n'est pas activé ! vérifiez votre courrier pour activer votre compte."
            } 
            if(err.response?.data.message === "Incorrect password !"){
                msg = "Mot de passe incorrect !"
            } 
            else {
                msg = err.response.data.message
            }
        }

        if(typeof err.response?.data === 'string'){
            if(err.response?.data === "User doesn't exist ! Enter Valid email !"){
                msg = "L'utilisateur n'existe pas ! Entrez une adresse email valide !"
            }
            else {
                msg = err.response?.data
            }
        }

        console.log(err.response.data);
        dispatch(
            updateSession({
                verified: false,
                loggedIn: false,
                success: false,
                error: true,
                message: msg
            })
        );
    }
};


export const LoginUser = (
    user
  ) => async dispatch => {
    setAuthToken(user.jwt)
    localStorage.setItem('jwtToken', user.jwt);
    localStorage.setItem('user', JSON.stringify(user));
    
    dispatch(
        updateSession({
            verified: true,
            loggedIn: true,
            user: user,
            success: true,
            error: false,
            message: ""
        })
    );
}


export const setCurrentUser = user => {
    setAuthToken(user.jwt)
    localStorage.removeItem("user")
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: UPDATE_SESSION,
        payload: {
            verified: true,
            loggedIn: true,
            success: false,
            error: false,
            message: "",
            user: user
        }
    }
}

export const resetLogin = () => async dispatch => {
    dispatch(
        updateSession({
            verified: false,
            loggedIn: false,
            user: {},
            success: false,
            error: false,
            message: ""
        })
    );
}


export const logoutUser = () => async dispatch => {
    try{
        await axios.put('http://192.168.1.113:5000/auth/logout');
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(
            updateSession({
                verified: false,
                loggedIn: false,
                user: {},
                success: false,
                error: false,
                message: ""
            })
        );
    } catch(err){
        console.log(err)
        dispatch(
            updateSession({
                verified: true,
                loggedIn: true,
                user: {},
                success: false,
                error: true,
                message: "server error"
            })
        );
    }
}

export const thunkGetHomeTechnicians = () => async dispatch => {
    try {
        const { data } = await axios.get('http://192.168.1.113:5000/search/most/viewed');
        
        dispatch(
            getHomeTechnicians({
                success: true,
                error: false,
                message: "",
                technicians: data
            })
        );
    } catch (err) {
        console.log(err.response.data)
        dispatch(
            getHomeTechnicians({
                success: false,
                error: true,
                message: "Server Error",
            })
        );
    }
};

