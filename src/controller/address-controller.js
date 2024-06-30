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

export default { create };
