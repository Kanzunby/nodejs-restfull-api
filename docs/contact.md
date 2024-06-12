# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "fist_name": "Kanzun",
  "last_name": "Bairuha",
  "email": "kanzunby@gmail.com",
  "phone": "081326984583"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "fist_name": "Kanzun",
    "last_name": "Bairuha",
    "email": "kanzunby@gmail.com",
    "phone": "081326984583"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "fist_name": "Kanzun",
  "last_name": "Bairuha",
  "email": "kanzunby@gmail.com",
  "phone": "081326984583"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "fist_name": "new first Name",
    "last_name": "new last name",
    "email": "new email",
    "phone": "new phone"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get COntact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "fist_name": "Kanzun",
    "last_name": "Bairuha",
    "email": "kanzunby@gmail.com",
    "phone": "081326984583"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is no found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "fist_name": "Kanzun",
      "last_name": "Bairuha",
      "email": "kanzunby@gmail.com",
      "phone": "081326984583"
    },
    {
      "id": 2,
      "fist_name": "Kanzun",
      "last_name": "Bairuha",
      "email": "kanzunby@gmail.com",
      "phone": "081326984583"
    },
    {
      "id": 3,
      "fist_name": "Kanzun",
      "last_name": "Bairuha",
      "email": "kanzunby@gmail.com",
      "phone": "081326984583"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

```json
{
  "data": [
    {
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi APa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi APa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi APa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```
