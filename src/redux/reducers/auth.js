const initialState = {
    token: '',
    alertMsg: '',
    isLogin: false,
    isLoading: false,
    isError: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'LOGIN_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                alertMsg: 'Failed Login',
            };
        }
        case 'LOGIN_FULFILLED': {
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                isError: false,
                isLoading: false,
                isLogin: true,
                token: action.payload.data.token,
                alertMsg: 'Login Succesfully',
            };
        }
        case 'SIGNUP_PENDING': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'SIGNUP_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                alertMsg: action.payload.response.data.message,
            };
        }
        case 'SIGNUP_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                alertMsg: action.payload.data.message,
            };
        }
        case 'SET_TOKEN': {
            return {
                ...state,
                isLogin: true,
                token: action.payload

            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLogin: false,
                token: '',
                alertMsg: '',
            };
        }
        default: {
            return state;
        }
    }
};

