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

export default { create, get };