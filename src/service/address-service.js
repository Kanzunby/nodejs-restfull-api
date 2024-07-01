import { validate } from "../validation/validation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseErrorr } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";

const checkContactValidation = async (authorId, contactId) => {
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

  return contactId;
};

// Create Address
const create = async (authorId, contactId, request) => {
  contactId = await checkContactValidation(authorId, contactId);

  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

// Get Address
const get = async (authorId, contactId, addressId) => {
  contactId = await checkContactValidation(authorId, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseErrorr(404, "address is not found");
  }

  return address;
};

// Update Address
const update = async (authorId, contactId, request) => {
  contactId = await checkContactValidation(authorId, contactId);
  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseErrorr(404, "address is not found");
  }

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

export default { create, get, update };
