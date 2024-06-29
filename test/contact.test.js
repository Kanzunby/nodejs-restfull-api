import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { logger } from "../src/apps/logging.js";
import {
  createManyTestContact,
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

describe("PUT /api/contacts/:contactId", function () {
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

  it("should can update existing contact", async () => {
    const author = await getTestUser();
    const testContact = await getTestContact(author.id);

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "Kanzun",
        last_name: "Bairuha",
        email: "kanzunby@gmail.com",
        phone: "081326473857",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Kanzun");
    expect(result.body.data.last_name).toBe("Bairuha");
    expect(result.body.data.email).toBe("kanzunby@gmail.com");
    expect(result.body.data.phone).toBe("081326473857");
  });

  it("should reject if request is invalid", async () => {
    const author = await getTestUser();
    const testContact = await getTestContact(author.id);

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "kanzunby",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const result = await supertest(web)
      .put("/api/contacts/667ff25b6ba88b5d43788b59")
      .set("Authorization", "test")
      .send({
        first_name: "Kanzun",
        last_name: "Bairuha",
        email: "kanzunby@gmail.com",
        phone: "081326473857",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", function () {
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

  it("should can delete contact", async () => {
    const author = await getTestUser();
    let testContact = await getTestContact(author.id);

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Ok");

    testContact = await getTestContact(author.id);
    expect(testContact).toBeNull();
  });

  it("should reject if contact is not found", async () => {
    const result = await supertest(web)
      .delete("/api/contacts/667ff25b6ba88b5d43788b59")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
    const author = await getTestUser();
    await createManyTestContact(author.id);
  });

  afterEach(async () => {
    const author = await getTestUser();
    await removeAllTestContacts(author.id);
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ page: 2 })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ name: "test 1" })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ email: "test1" })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ phone: "0834657481" })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
