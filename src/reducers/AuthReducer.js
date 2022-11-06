import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from "../components/actions/type";
const INTIAL_STATE = { email: '', password: '', user: null, error: '', loading: false}
export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INTIAL_STATE ,user: action.payload, };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, loading: false, password: '' };
        case LOGIN_USER:
            return { ...state, loading: true }
        default:
            return state;
    }
}