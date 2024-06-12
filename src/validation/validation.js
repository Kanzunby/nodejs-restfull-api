import { ResponseErrorr } from "../error/response-error.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseErrorr(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
