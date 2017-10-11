import React from 'react';
import withApp from '../lib/withApp';
import DetailPage from '../containers/DetailPage';

const Details = props => (<DetailPage {...props} />);

export default withApp()(Details);
