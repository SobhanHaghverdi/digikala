import { Joi, validate } from "express-validation";
import ProductType from "../../common/constant/product-enum.js";

const validateCreate = validate({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().optional().allow(null),
    count: Joi.number().optional().allow(null),
    discount: Joi.number().optional().allow(null),
    active_discount: Joi.boolean().optional().allow(null),
    type: Joi.string()
      .valid(...Object.values(ProductType))
      .required(),
    details: Joi.array()
      .items(
        Joi.object({
          key: Joi.string().required(),
          value: Joi.string().required(),
        })
      )
      .optional(),
    colors: Joi.array()
      .items(
        Joi.object({
          code: Joi.string().required(),
          name: Joi.string().required(),
          price: Joi.number().required(),
          count: Joi.number().required(),
          discount: Joi.number().optional().allow(null),
          active_discount: Joi.boolean().optional().allow(null),
        })
      )
      .optional(),
    sizes: Joi.array()
      .items(
        Joi.object({
          size: Joi.string().required(),
          price: Joi.number().required(),
          count: Joi.number().required(),
          discount: Joi.number().optional().allow(null),
          active_discount: Joi.boolean().optional().allow(null),
        })
      )
      .optional(),
  }),
});

const productValidator = { validateCreate };
export default productValidator;
