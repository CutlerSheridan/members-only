const _postSchema = ({
  _id,
  date = Date.now(),
  title,
  content,
  submitted_by,
}) => {
  return {
    _id,
    date,
    title,
    content,
    submitted_by,
  };
};
const Post = (dataObj) => {
  const post = _postSchema(dataObj);
  post.formatDate = () => {
    // TODO
  };
  return post;
};

module.exports = Post;
