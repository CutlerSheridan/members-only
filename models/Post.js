const _postSchema = ({
  _id,
  date = Date.now(),
  title,
  message,
  submitted_by,
}) => {
  return {
    _id,
    date,
    title,
    message,
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

modules.export = Post;
