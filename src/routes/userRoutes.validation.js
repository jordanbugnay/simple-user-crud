import Joi from "@hapi/joi";

const listUsers = queryString => {
  const schema = Joi.object({
    limit: Joi.number(),
    sort: Joi.string(),
    filter: Joi.string(),
    offset: Joi.number()
  });

  return schema.validate(queryString);
};

const getUser = queryString => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  return schema.validate(queryString);
};

const postUser = body => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
  });

  return schema.validate(body);
};

const putUser = body => {
  const schema = Joi.object({
    id: Joi.number().required(),
    opts: Joi.object({
      name: Joi.string(),
      email: Joi.string().email()
    }).required()
  });
  return schema.validate(body);
};

const deleteUser = body => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  return schema.validate(body);
};

export default {
  listUsers,
  getUser,
  postUser,
  putUser,
  deleteUser
};
