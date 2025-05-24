const envdetails = JSON.parse(JSON.stringify(require("../env-config/login-data.json")));


export function baseurl() {
    let baseurl : any =  process.env.URL;
    return baseurl;
  }

export function username() {
    return envdetails.username;
}


export function password() {
    return envdetails.password;
}