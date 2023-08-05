const _userSchema = ({
  _id,
  first_name,
  last_name,
  username,
  password,
  email,
  isMember = false,
  isAdmin = false,
}) => {
  return {
    _id,
    first_name,
    last_name,
    username,
    password,
    email,
    isMember,
    isAdmin,
  };
};
const User = (dataObj) => {
  const user = _userSchema(dataObj);
  user.getFullName = () => user.first_name + ' ' + user.last_name;

  return user;
};

module.exports = User;
