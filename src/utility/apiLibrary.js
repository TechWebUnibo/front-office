// For auth
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_KEY = 'access_token'
const PUBLICKEY_KEY = 'publicKey'
const BASE_URL = '//site202118.tw.cs.unibo.it/api/auth'
const PUBLICKEY_URL = BASE_URL + '/publicKey'
const CUSTMER_LOGIN = BASE_URL + '/login/customers'
const CUSTOMER_REGISTER = BASE_URL + '/customers'

// For API
const url = '//site202118.tw.cs.unibo.it/api/'
const customersUrl = 'customers'
const rentsUrl = 'rentals'
const staffUrl = 'staff'
const invoicesUrl = 'invoices'
const productsUrl = 'products'
const itemsUrl = 'items'



export async function apiLogin(username, password) {
  let data = `{
        "username": "${username}",
        "password": "${password}"
        }`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  try {
    let res = await fetch(CUSTMER_LOGIN, requestOptions);
    let status = res.status;
    res = await res.json();
    if (status === 200) {
      setToken(res.accessToken);
    }
    return status;
  } catch (e) {
    console.log(e);
  }
  return 502;
}


export function logout() {
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

export async function isLogged(){
    try{
        let decoded = jwt.verify(getToken(), await getPublicKey(), { algorithm: 'RS256' })
        return decoded.role === 'customer'
    }
    catch(err){
        console.log(err)
        return false
    }
}


export async function getCustomers (){
    let res = await fetch(url + customersUrl, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
    if(res.status === 200){
        res = await res.json()
        return res
    }
    else{
        return []
    }
}
export async function getStaff(){
        try {
            let res = await fetch(url + staffUrl, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getToken()
                },
            })
            if (res.status === 200) {
                res = await res.json()
                return res
            }
            else {
                return []
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    export async function getProducts(){
        try{
            let res = await fetch(url + productsUrl, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getToken()
                },
            })
            if(res.status === 200){
                res = await res.json()
                return res
            }
            else{
                return []
            }
        }
        catch(e){
            console.log(e)
        }
    }
    export async function getRentals(query){
        if(typeof query != 'undefined'){
            query = '?' + new URLSearchParams(query).toString()
        }
        else{
            query = ''
        }
        try{
            let res = await fetch(url + rentsUrl + query, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getToken()
                },
            })
            if(res.status === 200){
                res = await res.json()
                return res
            }
            else{
                return []
            }
        }
        catch(e){
            console.log(e)
        }
    }
    export async function getInvoices(query) {
        if (typeof query != 'undefined') {
            query = '?' + new URLSearchParams(query).toString()
        }
        else {
            query = ''
        }
        try {
            let res = await fetch(url + invoicesUrl + query, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getToken()
                },
            })
            if (res.status === 200) {
                res = await res.json()
                return res
            }
            else {
                return []
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    export async function getItems(query) {
        if (typeof query != 'undefined') {
            query = '?' + new URLSearchParams(query).toString()
        }
        else {
            query = ''
        }
        try {
            let res = await fetch(url + itemsUrl + query, {
                method: 'GET',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getToken()
                },
            })
            if (res.status === 200) {
                res = await res.json()
                return res
            }
            else {
                return []
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    export async function modifyStaff(id, data) {
        try {
            let res = await fetch(url + staffUrl + '/' + id, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify(data)
            })
            if (res.status === 200) {
                res = await res.json()
                return res
            }
            else {
                return []
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    export async function apiRegister(name, surname, username, password, address, city, zip, avatar) {
        let data = `{
              "name": "${name}",
              "surname": "${surname}",
              "username": "${username}",
              "password": "${password}",
              "avatar": "${avatar}",
              "address":
                {
                    "city": "${city}",
                    "zip": "${zip}",
                    "residence": "${address}"
                }
              }`;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        };
        try {
          let res = await fetch(CUSTOMER_REGISTER, requestOptions);
          let status = res.status;
          res = await res.json();
          if (status === 200) {
            setToken(res.accessToken);
          }
          return status;
        } catch (e) {
          console.log(e);
        }
        return 502;
      }

export async function getUser(){
    let token = getToken()
    try{
        let decoded = jwt.verify(token, await getPublicKey(), { algorithm: 'RS256' })
        return decoded._id
    }
    catch(err){
        console.log(err)
        return null
    }
}


export async function getAvailability (id, start, end, rent) {
    try {
        start = start.toISOString().split('T')[0]
        end = end.toISOString().split('T')[0]

        let res = await fetch(url + productsUrl + `/${id}/available?start=${start}&end=${end}${rent ? '&rent=' + rent : ''}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + getToken()
        }
        })
        if (res.status === 200) {
            res = await res.json()
            return res
        }
        else {
            return false
        }
    }
    catch(err){
        // console.log(err)
    }
}

export async function createRent (customer, start, end, price, products, productType){
    start = start.toISOString().split('T')[0]
    end = end.toISOString().split('T')[0]
    const data = {
        customer: customer,
        products: products,
        productType: productType,
        start: start,
        end: end,
        price: price
    }
    const res = await fetch(url +  rentsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(data)
    })
    return res.status
}

export async function createCustomer(name, surname, username, password, address, avatar){
        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('address.city', address.city);
        formData.append('address.residence', address.residence);
        formData.append('address.zip', address.zip);
        if(typeof avatar !== 'undefined')
            formData.append('avatar', avatar);
        try{
            let res = await fetch(url + customersUrl, {
                    method: 'POST',
                    body: formData
                })
            
            return { status: res.status, message: await res.json() }
        }
        catch(err){
            console.log(err)
        }
};