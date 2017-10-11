import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

const DetailPage = (props) => {
  return (
    <div>
      {props.url.query.postId}
    </div>
  );
};

DetailPage.propTypes = {
  url: PropTypes.object,
};

export default compose(
)(DetailPage);
