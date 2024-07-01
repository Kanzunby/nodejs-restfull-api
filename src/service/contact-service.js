import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseErrorr } from "../error/response-error.js";

// Create Contact
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

// Get Contact
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

// Update Contact
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

// Remove Contact
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

// Search Contact
const search = async (authorId, request) => {
  request = validate(searchContactValidation, request);

  // if (page = 1) {(page - 1) x size(10) = 0}
  // if (page = 2) {(page - 1) x size(10) = 10}
  const skip = (request.page - 1) * request.size;

  const filter = [];
  filter.push({
    authorId: authorId,
  });
  if (request.name) {
    filter.push({
      OR: [
        { first_name: { contains: request.name } },
        { last_name: { contains: request.name } },
      ],
    });
  }

  if (request.email) {
    filter.push({
      email: { contains: request.email },
    });
  }

  if (request.phone) {
    filter.push({
      phone: { contains: request.phone },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filter,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filter,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_page: Math.ceil(totalItems / request.size),
      total_item: totalItems,
    },
  };
};

export default { create, get, update, remove, search };
