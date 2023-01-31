class Http {
  baseURL = "http://192.168.15.238:3001/";
  // baseURL="http://192.168.6.121:3000/";
  async send(url: string, option = {}) {
    const response = await fetch(`${this.baseURL}${url}`, option);
    const data = await response.json();
    return data;
  };
  get(url: string) {
    return this.send(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", 'authorization': getStore("token") },
    });
  };
  post(url: string, data: any) {
    if (url === "auth/login") {
      return this.send(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    else {
      return this.send(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getStore("token"),
        },
        body: JSON.stringify(data),
      })
    };
  };
  put(url: string, data: any) {
    return this.send(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getStore("token"),
      },
      body: JSON.stringify(data),
    });
  }
  patch(url: string, data: any) {
    return this.send(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getStore("token"),
      },
      body: JSON.stringify(data),
    });
  }
  delete(url: string) {
    return this.send(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getStore("token"),
      },
    });
  }
}

const http = new Http();
export const setStore = (key: string, payload: string) => {
  localStorage.clear();
  localStorage.setItem(key, payload);
}
export const getStore = (key: string) => {
  const token = localStorage.getItem(key);
  return `Bearer ${token}`;
}
export default http;