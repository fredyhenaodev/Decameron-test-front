import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, TvMe } from 'dan-components';

class Tv extends React.Component {
  render() {
    const title = brand.name + ' - Radio';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="COBYTZ TV" desc="Tv" icon="ios-videocam">
          <TvMe />
        </PapperBlock>
      </div>
    );
  }
}

export default Tv;