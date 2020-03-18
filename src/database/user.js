import { User } from "./sequelize";

export const listUsers = async opts => {
  const { limit, sort, filter, offset } = opts;
  return await User.findAll({
    limit,
    order: [sort],
    offset,
    attributes: filter ? JSON.parse(filter) : false
  });
};

export const getUser = async id => await User.findOne({ where: { id } });

export const createUser = async data => {
  const { name, email } = data;

  const [details, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, email }
  });

  return { details, created };
};

export const updateUser = async data => {
  const { id, opts } = data;

  const user = await User.update(opts, { where: { id } });

  return user;
};

export const deleteUser = async id =>
  await User.destroy({ where: { id } }, { paranoid: true });
