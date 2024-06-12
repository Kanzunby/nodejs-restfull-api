# Address API Spec

## Create Address API

Endpoind : POST /api/contacts/:contactId/addresses

Headers:

- Authorization : token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi APa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi APa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Boddy Error:

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoind : PUT /api/contacts/:ContactId/addresses/:addressId

Headers:

- Authorization : token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi APa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi APa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Boddy Error:

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoind : GET /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi APa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Boddy Error:

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Endpoind : GET /api/contacts/:contactId/addresses

Headers:

- Authorization : token

Response Body Success:

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

Response Boddy Error:

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoind : DELETE /api/contacts/:contactId/addresses/:addressId

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Boddy Error:

```json
{
  "errors": "address is not found"
}
```
