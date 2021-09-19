export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false
    }

    if (sessionStorage.getItem("tweetboat")){
        return JSON.parse(sessionStorage.getItem("tweetboat"));
    }else{
        return false;
    }
};

export const logout = () => {
    sessionStorage.removeItem('tweetboat');
}

export const isTokenExpired = (token) => (Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000)
