import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const request = req.body;
    const contactId = req.params.contactId;

    const result = await addressService.create(authorId, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await addressService.get(authorId, contactId, addressId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;
    const request = req.body;
    request.id = addressId;

    const result = await addressService.update(authorId, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    await addressService.remove(authorId, contactId, addressId);
    res.status(200).json({
      data: "Ok",
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const contactId = req.params.contactId;

    const result = await addressService.list(authorId, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
export default { create, get, update, remove, list };
