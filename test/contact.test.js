import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { logger } from "../src/apps/logging.js";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  getTestUser,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    const author = await getTestUser();
    await removeAllTestContacts(author.id);
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "081234567",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("081234567");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "test",
        email: "test@gmail.com",
        phone: "0812345689075432097589237097",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    const author = await getTestUser();
    await createTestContact(author.id);
  });

  afterEach(async () => {
    const author = await getTestUser();
    await removeAllTestContacts(author.id);
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const author = await getTestUser();
    const testContact = await getTestContact(author.id);

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const result = await supertest(web)
      .get("/api/contacts/667fcb8e022c643814fb1119")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});
