export const helpHttp = () => {


    const customFetch = (endpoint,options) => { 
        const defaultHeader ={
          /*   accept: "aplication/json", */
           /*  accept: "image/*", */
            
        }

        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || "GET";
        options.headers =options.headers
        ?{...defaultHeader,...options.headers}:defaultHeader;

        options.body = options.body || false;

        if (!options.body) {
            delete options.body;

        }

       // console.log(options);
        setTimeout(() => controller.abort(),50000);



        return fetch(endpoint, options)
        .then((rest) =>
         rest.ok 
         ? rest.json()
         : Promise.reject({
            err:true,
            status:res.status || "00",
            statusText: res.statusText || "Ocurrio un error",
        })).catch((err)=>err)
    }

    const get = (url,options = {}) =>  customFetch(url,options);

    const post = (url,options ={}) => {
        options.method  = "POST";
        return customFetch(url, options);
     }

     const put = (url,options ={}) => {
        options.method  = "PUT";
        return customFetch(url, options);
     }

     const del = (url,options ={}) => {
        options.method  = "DELETE";
        return customFetch(url, options);
     }

    return {
        get, post, put, del,
    }
}


