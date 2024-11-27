import LoginAPI from "../../api/LoginAPI";

export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = (user) => {
    return async dispatch => {
        try {
            const response = await LoginAPI.login(user);
            dispatch({ type: LOGIN, payload: response.data, user: user });
        } catch (error) {
            dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
        }
    }
}