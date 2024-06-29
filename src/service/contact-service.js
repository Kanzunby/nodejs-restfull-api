import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
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

const update = async (authorId, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      authorId: authorId,
      id: contact.id,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseErrorr(404, "contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (authorId, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      authorId: authorId,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseErrorr(404, "contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};
export default { create, get, update, remove };
