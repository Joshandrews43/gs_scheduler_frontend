const baseURL  = 'https://gaucho-scheduler.herokuapp.com';

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
   console.log(res);
   return res;
}

export const getRequest = async(url) => {
  var res = await fetch(baseURL + url, {
    method: 'GET',
      headers: {
      'Accept': 'application/json',
    },
   });
   res = res.json()
   .catch(err => {
     console.log(err);
   })

   console.log(res);
   return res;
}
