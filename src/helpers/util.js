const baseURL = process.env.NODE_ENV === 'production' ? 'prodURL' : 'localhost';

export const postRequest = async(url, params) => {
  var res = await fetch(baseURL + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
   });
   res = res.json()
   .catch(err => {
     console.log(err);
   })

   return res;
}
