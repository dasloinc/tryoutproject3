import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';

//destructuring - ...rest will collect all the properties that we aren't pulling out from the component,role
//we will store them in the varieble ...rest
const PrivateRoute = ({component : Component, ...rest}) => {
    //just a reminder isAuthenticated will check if the user is authenticated.
    const {isAuthenticated} = useContext(AuthContext)
    return(
        <Route {...rest} render={props => {
            //here we decide what we want to be rendered
            if(!isAuthenticated)
                return<Redirect to={{pathname: '/signin', state : {from : props.location}}}/>
            
            // authenticated and have the correct role like admin or user
            // if(!roles.includes(user.role))
            //     return <Redirect to={{pathname: '/', state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )

}

export default PrivateRoute;