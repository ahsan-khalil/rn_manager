import React, { Component } from "react";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "./actions";
import { View , Text, StyleSheet} from "react-native";

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLoginPress() {
        const {email, password} = this.props;
        
        this.props.loginUser(email, password);
    }

    renderError() {
        const { error } = this.props;
        if (error != '') {
            return (
                    <CardSection style={{ backgroundColor: 'white' }}>
                        <Text style={styles.errorTextStyle}>
                            { error } 
                        </Text>
                    </CardSection>
                )
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <Button
                onPress={ this.onLoginPress.bind(this) }
            >
                Login
            </Button>
        )
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@gmail.com"
                        value={ this.props.email }
                        onChangeText = { this.onEmailChange.bind(this) }
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="Password"
                        value={ this.props.password }
                        onChangeText={ this.onPasswordChange.bind(this) }
                    />
                </CardSection>
                { this.renderError() }
                <CardSection>
                    { this.renderButton() }
                </CardSection>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
})

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);