import {
  createContactValidation,
  getContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseErrorr } from "../error/response-error.js";

const create = async (authorId, request) => {
  const contact = validate(createContactValidation, request);
  contact.authorId = authorId;

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

const get = async (authorId, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      authorId: authorId,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseErrorr(404, "contact is not found");
  }

  return contact;
};

export default { create, get };
