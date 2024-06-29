import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const request = req.body;
    const result = await contactService.create(authorId, request);
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
    const result = await contactService.get(authorId, contactId);
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
    const request = req.body;
    request.id = contactId;

    const result = await contactService.update(authorId, request);
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

    await contactService.remove(authorId, contactId);
    res.status(200).json({
      data: "Ok",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await contactService.search(authorId, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, search };
