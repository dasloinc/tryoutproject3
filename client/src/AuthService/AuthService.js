
export default {
    signin : user => {
        // console.log(user);
        return fetch('/user/signin', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            // console.log(res + "hello")
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return {isAuthenticated : false, user : {email : ""}};
        })
        

    },
    signup : user => {
        return fetch('user/signup', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout : () => {
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    //here we will sync the back & the front end when the react app is closed
    //even when we closing the react app, the user still will be authenticated when login
    //passport will send 401 if we are not authenticated
    isAuthenticated : ()=>{
        console.log("here");
        // let thePromise = fetch('user/authenticated');
        // let cb =  (res) => {console.log(res)};
        // thePromise.then(cb);
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                    console.log("this is the F")
                        return { isAuthenticated : false, user : {email : ""}};
                });
    }

}