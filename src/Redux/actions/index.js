export const Error = (err) => {
    return{
        type: 'USERNAME',
        payload: err
    }
}

export const Loading = () => {
    return{
        type: 'LOADING',
    }
}

export const Loaded = () => {
    return{
        type: 'LOADED',
    }
}


