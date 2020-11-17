export const LogIn = (email, password) => {
    return{
        type: 'LOGIN',
    }
}

export function LogOut() {
    return {
        type: 'LOGOUT'
    };
}


  