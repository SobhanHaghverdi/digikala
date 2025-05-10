import { Joi, validate } from "express-validation";

const validateCreateMany = validate({
  body: Joi.object({
    roleId: Joi.number().required(),
    permissions: Joi.array().items(Joi.number()),
  }),
});

const rolePermissionValidator = { validateCreateMany };
export default rolePermissionValidator;
