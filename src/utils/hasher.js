import bcrypt from "bcryptjs";

export const password_hash = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

export const password_verify = async (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};
