import { createContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../apps/database.js";

const create = async (author, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = author.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

export default { create };
