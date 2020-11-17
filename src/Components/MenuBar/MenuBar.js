import React from 'react';
import { useSelector } from 'react-redux';

import Logout from '../../Authorization/Logout/Logout'


function MenuBar({ messageVisibility, toggleMessage, getMovies }){
    const isAuth = useSelector(state => state.isAuth)
    return(
        <div>
            {isAuth &&
            <>
                <Logout />
            </>
            }
        </div>
    )
}


export default MenuBar;
