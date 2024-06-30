import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { logger } from "../src/apps/logging.js";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  getTestUser,
  removeAllTestAddress,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts/:contactId/address", () => {
  beforeEach(async () => {
    await createTestUser();
    const author = await getTestUser();
    await createTestContact(author.id);
  });

  afterEach(async () => {
    const author = await getTestUser();
    await removeAllTestAddress(author.id);
    await removeAllTestContacts(author.id);
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const author = await getTestUser();
    const testContact = await getTestContact(author.id);

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/address`)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "city",
        province: "province",
        country: "country",
        postal_code: "87654",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.street).toBe("street");
    expect(result.body.data.city).toBe("city");
    expect(result.body.data.province).toBe("province");
    expect(result.body.data.country).toBe("country");
    expect(result.body.data.postal_code).toBe("87654");
  });

  it("should if address request is invalid", async () => {
    const author = await getTestUser();
    const testContact = await getTestContact(author.id);

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/address`)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "",
        province: "",
        country: "country",
        postal_code: "87654",
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
        postal_code: "87654",
      });

    expect(result.status).toBe(404);
  });
});
