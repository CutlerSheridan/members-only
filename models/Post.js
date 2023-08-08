const { DateTime } = require('luxon');

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
    const date = DateTime.fromJSDate(post.date).toLocaleString(
      DateTime.DATE_MED
    );
    const time = DateTime.fromJSDate(post.date).toLocaleString(
      DateTime.TIME_24_SIMPLE
    );
    return date + ' - ' + time;
  };
  return post;
};

module.exports = Post;
