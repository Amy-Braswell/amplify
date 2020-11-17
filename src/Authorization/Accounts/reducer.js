const username = (state = '', action) => {
    switch(action.type) {
        case 'USERNAME':
            return state + action.payload
        default:
            return state
    }
}

export default username 