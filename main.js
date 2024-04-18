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
  `  
  <div class="flex flex-col min-h-screen items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">Cadastro de Empresas</h1>

    <form action="/cadastrar-empresa" method="POST" class="space-y-4 w-full max-w-sm bg-white shadow-md rounded-md p-8">
      <label for="nomeEmpresa" class="block text-sm font-medium text-gray-700">
        Nome da Empresa:
      </label>
      <input type="text" id="nomeEmpresa" name="nomeEmpresa" required class="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">

      <label for="endereco" class="block text-sm font-medium text-gray-700">
        Endereço:
      </label>
      <input type="text" id="endereco" name="endereco" required class="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">

      <label for="competencia" class="block text-sm font-medium text-gray-700">
        Competência:
      </label>
      <input type="text" id="competencia" name="competencia" required class="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">

      <label for="cnpj" class="block text-sm font-medium text-gray-700">
        CNPJ:
      </label>
      <input type="text" id="cnpj" name="cnpj" required class="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">

      <button type="submit" class="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Cadastrar
      </button>
    </form>
  </div> 
`,
  '#app'
);

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
