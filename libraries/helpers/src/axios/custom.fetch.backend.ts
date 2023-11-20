import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {AuthService} from "@meetqa/helpers/src/auth/auth.service";

const parseData = async (response: Response) => {
    try {
        const data = await response.json();
        return data;
    }
    catch (err) {
        return undefined;
    }
}

export const customFetchBackend = (token?: UserInterface | string) => {
  return {
    get: async (url: string, request?: RequestInit) => {
      const load = await fetch(process?.env?.BACKEND_URL + url, {
        ...request,
        method: "GET",
        cache: request?.cache || "no-store",
        headers: {
          ...token ? {
              auth: typeof token === "string" ? token : AuthService.signJWT(token)
          } : {},
          ...request?.headers
        }
      });

      return {data: await parseData(load), status: load.status};
    },
    post: async (url: string, body: object, request?: RequestInit) => {
        const load = await fetch(process?.env?.BACKEND_URL + url, {
            ...request,
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                ...token ? {
                    auth: typeof token === "string" ? token : AuthService.signJWT(token)
                } : {},
              ...request?.headers,
              "Content-Type": "application/json"
            },
            cache: request?.cache || "no-store",
        });

        return {data: await parseData(load), status: load.status};
    },
    put: async (url: string, body: object, request?: RequestInit) => {
        const load = await fetch(process?.env?.BACKEND_URL + url, {
            ...request,
            body: JSON.stringify(body),
            method: "PUT",
            headers: {
                ...token ? {
                    auth: typeof token === "string" ? token : AuthService.signJWT(token)
                } : {},
                ...request?.headers,
                "Content-Type": "application/json"
            }
        });

        return {data: await parseData(load), status: load.status};
    },
    delete: async (url: string, body: object, request?: RequestInit) => {
        const load = await fetch(process?.env?.BACKEND_URL + url, {
            ...request,
            body: JSON.stringify(body),
            method: "DELETE",
            headers: {
                ...token ? {
                    auth: typeof token === "string" ? token : AuthService.signJWT(token)
                } : {},
                ...request?.headers,
                "Content-Type": "application/json"
            }
        });

        return {data: await parseData(load), status: load.status};
    }
  }
}

export const fetchBackend = (url: string, options: object) => {
  return fetch(process?.env?.BACKEND_URL + url, options);
}
