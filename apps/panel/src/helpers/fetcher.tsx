import {customFetch} from "@crosspublic/panel/src/helpers/fetch.context";

const fetcher = async (...args: any[]) => {
    // @ts-ignore
    const {data} = await customFetch.get(...args)
    return data;
}

export default fetcher;
