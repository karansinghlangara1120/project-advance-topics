// const requestApi = async url => {
//   try {
//     const response = await fetch(url);
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// };
class RequestClass {
  request = async config => {
    console.log('config', config);
    try {
      const data = await fetch(config.url, {
        method: config.method, // or 'PUT'
        headers: {
          Accept: 'application/json',
        },
        body: config.data,
      });
      return await data.json();
    } catch (error) {
      console.error('Error:', error);
    }

    // .then(response => response.json())
    // .then(data => {
    //   return data;
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
  };
}
const Request = new RequestClass();

export {Request};
