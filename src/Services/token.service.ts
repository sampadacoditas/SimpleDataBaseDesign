class TokenService {
  getLocalAccessToken() {
    const tokenObject = JSON.parse(localStorage.getItem("token") || "{}");
    return tokenObject?.access_token;
  }

  updateLocalAccessToken(token: any) {
    let tokenObject = JSON.parse(localStorage.getItem("token") || "{}");
    tokenObject.access_Token = token;
    localStorage.setItem("token", JSON.stringify(tokenObject));
  }

  getLocalRefreshToken() {
    const tokenObject = JSON.parse(localStorage.getItem("token") || "{}");
    return tokenObject?.refresh_Token;
  }
  getToken() {
    return JSON.parse(localStorage.getItem("token") || "{}");
  }

  setToken(token: any) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}

const tokenService = new TokenService();
export default tokenService;
