import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { logger } from "../src/apps/logging.js";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  getTestUser,
  removeAllTestAddress,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";

const before = (createAddress) => {
  beforeEach(async () => {
    await createTestUser();
    const author = await getTestUser();
    await createTestContact(author.id);

    if (createAddress) {
      await createTestAddress(author.id);
    }
  });
};

const after = () => {
  afterEach(async () => {
    const author = await getTestUser();
    await removeAllTestAddress(author.id);
    await removeAllTestContacts(author.id);
    await removeTestUser();
  });
};

// Test create address
describe("POST /api/contacts/:contactId/address", () => {
  const createAddress = false;
  before(createAddress);
  after();

  it("should can create new address", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);

    const result = await supertest(web)
      .post(`/api/contacts/${contact.id}/address`)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "city",
        province: "province",
        country: "country",
        postal_code: "54351",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.street).toBe("street");
    expect(result.body.data.city).toBe("city");
    expect(result.body.data.province).toBe("province");
    expect(result.body.data.country).toBe("country");
    expect(result.body.data.postal_code).toBe("54351");
  });

  it("should if address request is invalid", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);

    const result = await supertest(web)
      .post(`/api/contacts/${contact.id}/address`)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "",
        province: "",
        country: "country",
        postal_code: "54351",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const result = await supertest(web)
      .post(`/api/contacts/66809e5c32ee100026d90179/address`)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "",
        province: "",
        country: "country",
        postal_code: "54351",
      });

    expect(result.status).toBe(404);
  });
});

// Test get address
describe("GET /api/contacts/:contactId/address/:addressId", () => {
  const createAddress = true;
  before(createAddress);
  after();

  it("should can get address", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}/address/${address.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.street).toBe("street");
    expect(result.body.data.city).toBe("city");
    expect(result.body.data.province).toBe("province");
    expect(result.body.data.country).toBe("country");
    expect(result.body.data.postal_code).toBe("54351");
  });

  it("should reject is contact is not found", async () => {
    const author = await getTestUser();
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .get(`/api/contacts/66809e5c32ee100026d90179/address/${address.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("should reject is address is not found", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}/address/66809e5c32ee100026d90179`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

// Test update address
describe("PUT /api/contacts/:contactId/address/:addressId", () => {
  const createAddress = true;
  before(createAddress);
  after();

  it("should can update address", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}/address/${address.id}`)
      .set("Authorization", "test")
      .send({
        street: "new street",
        city: "new city",
        province: "new province",
        country: "new country",
        postal_code: "54352",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(address.id);
    expect(result.body.data.street).toBe("new street");
    expect(result.body.data.city).toBe("new city");
    expect(result.body.data.province).toBe("new province");
    expect(result.body.data.country).toBe("new country");
    expect(result.body.data.postal_code).toBe("54352");
  });

  it("should reject if request is not valid", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}/address/${address.id}`)
      .set("Authorization", "test")
      .send({
        street: "new street",
        city: "new city",
        province: "",
        country: "",
        postal_code: "54352",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if address is not found", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);

    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}/address/66809e5c32ee100026d90179`)
      .set("Authorization", "test")
      .send({
        street: "new street",
        city: "new city",
        province: "new province",
        country: "new country",
        postal_code: "54352",
      });

    expect(result.status).toBe(404);
  });

  it("should reject if contact is not found", async () => {
    const author = await getTestUser();
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .put(`/api/contacts/66809e5c32ee100026d90179/address/${address.id}`)
      .set("Authorization", "test")
      .send({
        street: "new street",
        city: "new city",
        province: "new province",
        country: "new country",
        postal_code: "54352",
      });

    expect(result.status).toBe(404);
  });
});

// Test delete address
describe("DELETE /api/contacts/:contactId/address/:addressId", () => {
  const createAddress = true;
  before(createAddress);
  after();

  it("should can remove address", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id}/address/${address.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");

    const deleteAddress = await getTestAddress(author.id);
    expect(deleteAddress).toBeNull();
  });

  it("should reject if contact is not found", async () => {
    const author = await getTestUser();
    const address = await getTestAddress(author.id);

    const result = await supertest(web)
      .delete(`/api/contacts/66809e5c32ee100026d90179/address/${address.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("should reject if address is not found", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);

    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id}/address/66809e5c32ee100026d90179`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

// Test list address
describe("GET /api/contacts/:contactId/address", () => {
  const createAddress = true;
  before(createAddress);
  after();

  it("should can list address", async () => {
    const author = await getTestUser();
    const contact = await getTestContact(author.id);

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}/address`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("should reject if contact is not found", async () => {
    const result = await supertest(web)
      .get(`/api/contacts/668299a82876d147989b3e6b/address`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});
