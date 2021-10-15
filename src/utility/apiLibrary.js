
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_KEY = 'access_token'
const PUBLICKEY_KEY = 'publicKey'
const BASE_URL = '//site202118.tw.cs.unibo.it/api/auth'
const PUBLICKEY_URL = BASE_URL + '/publicKey'
const CUSTMER_LOGIN = BASE_URL + '/login/customers'

async function apiLogin(username, password) {
    let data = `{
        "username": "${username}",
        "password": "${password}"
        }`;
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data,
      };
      try{
        let res = await fetch(CUSTMER_LOGIN, requestOptions,)
        let status = res.status;
        res = await res.json();
        if(status === 200){
            setToken(res.accessToken);
        }
        return status;
      }
      catch(e){
        console.log(e)
    }
    return 502;
         
}


export function logout() {
    console.log('non dovrei essere qui')
    setToken(null);
}

export async function refreshPublicKey() {
    let res = await fetch(PUBLICKEY_URL, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    })
    let status = res.status
    res = await res.json()
    if (status === 200) {
        localStorage[PUBLICKEY_KEY] = res.publicKey
    }
}


async function getPublicKey() {
    if (!localStorage[PUBLICKEY_KEY] || localStorage[PUBLICKEY_KEY] === 'undefined'){
        await refreshPublicKey()
    }
    return localStorage[PUBLICKEY_KEY]
}


function setToken(token){
    localStorage[ACCESS_TOKEN_KEY] = token
}


export function getToken(){
    return localStorage[ACCESS_TOKEN_KEY]
}
/*
function clearToken()  {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}*/

export async function isLogged(){
    /*
    let res = await fetch(MANAGER_AUTH, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + getToken()
        }
    })
    console.log(res.status)
    if(res.status === 401)
        return false
    else
        return true
        */
    try{
        console.log(getToken())
        console.log(jwt.verify(getToken(), await getPublicKey(), { algorithm: 'RS256' }))
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}



export default apiLogin;