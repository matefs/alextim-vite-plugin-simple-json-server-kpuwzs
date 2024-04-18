import './style.css';

var lastIdOfAllTheItems;
fetchApi('/api/products').then((data) => {
  lastIdOfAllTheItems = data[data.length - 1].id;
  console.log(lastIdOfAllTheItems);
});

function updateView(html, id = '#examples') {
  document.querySelector(id).innerHTML += html;
}

updateView(
  `  asdfasdfasdf
`,
  '#app'
);
/// Docs: 
// https://www.npmjs.com/package/vite-plugin-simple-json-server/v/0.4.1
// document.querySelector('#app').innerHTML += 'lçasjdflçjasçldkfçlasjdf'

function handleErrors(resp) {
  if (!resp.ok) {
    throw Error(`${resp.status} ${resp.statusText}`);
  }
  return resp;
}

function fetchApi(url, data = undefined, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  return fetch(url, options)
    .then(handleErrors)
    .then((resp) => {
      if (method === 'HEAD') {
        return { 'X-Total-Count': resp.headers.get('X-Total-Count') };
      }
      return resp.json();
    })
    .catch((err) => {
      console.error(err.toString());
      return Promise.reject(err);
    });
}

fetchApi('/api/products').then((data) => console.log(data));
// fetchApi('/api/products/11', { title: 'iphone 20', rating: { rate: 4.5, count: 500 }, color: 'black' }, 'POST')
//   .then((data) => console.log(data));
