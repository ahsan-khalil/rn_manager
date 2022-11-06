import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from "firebase/app";

import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from "./type"
export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
}

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
}

export const loginUser = (email, password) => {
    const firebaseConfig = {
        apiKey: "AIzaSyChAwnE8YY7b_IYSK2zczhJYTifQF7g7jo",
        authDomain: "rn-manager-f6345.firebaseapp.com",
        projectId: "rn-manager-f6345",
        storageBucket: "rn-manager-f6345.appspot.com",
        messagingSenderId: "338643672059",
        appId: "1:338643672059:web:328977f5f1f27c8135c95e"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
    return (dispatch) => {
        const auth = getAuth(app);
        dispatch({ type: LOGIN_USER })
        signInWithEmailAndPassword(auth ,email, password).then((user) => {
            loginUserSuccess(dispatch, user.user);
          })
          .catch(error => {
            if (error.code == 'auth/user-not-found') {
                createUserWithEmailAndPassword(auth, email, password).then((user) => {
                    loginUserSuccess(dispatch, user.user);
                }).catch(error => {
                    loginUserFail(dispatch, 'Error in creating user');
                });
            }

            if (error.code === 'auth/email-already-in-use') {
                loginUserFail(dispatch,'That email address is already in use!');
            }

            if (error.code === 'auth/wrong-password') {
                loginUserFail(dispatch,'Invalid Password!');
            }
        
            if (error.code === 'auth/invalid-email') {
              loginUserFail(dispatch,'That email address is invalid!');
            }
        
            console.log(error);
          });
    };
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
}

const loginUserFail = (dispatch, message) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: message
    })
}