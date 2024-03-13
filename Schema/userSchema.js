const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  contactNo: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  address: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});

module.exports = {
  registerSchema,
};
