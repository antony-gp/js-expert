### Cep service

`findCity(cep)`: Must return city and state data based on CEP (Brazilian postal code)

### Request service

`get(url)`: makes a `GET` request to the specified url

---

### Tests

#### CEP tests

```bash
npm t -- --cep
```

- Stubs will be used instead of actual requests

#### Request tests

```bash
npm t -- --request
```

- Will make requests to the API in order to validate current mocks
