import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { initializeApp } from "firebase/app";
import LoginForm from './components/LoginForm';

class App extends Component {
    componentDidMount() {
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
    }
    
    render() {
        return(
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <SafeAreaView>
                    <LoginForm />
                </SafeAreaView>
            </Provider>
        );
    }
}

export default App;