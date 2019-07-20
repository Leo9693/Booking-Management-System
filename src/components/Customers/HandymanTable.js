import React from 'react';
import { Link } from 'react-router-dom';

// import Button from '../UI/Button';
import FlexView from '../Ui/FlexView';

const PUBLIC_URL = process.env.PUBLIC_URL;
const styles = {
  cover: {
    width: '100%',
    height: 175,
    objectFit: 'cover'
  },
  contentWrapper: {
    backgroundColor: 'white',
    height: 230,
    padding: '10px 15px'
  },
  meta: {
    color: '#9a9a9a',
    fontSize: 14
  },
  separator: {
    margin: '3px 10px'
  }
};

function CoverPhoto({ img }) {
  return (
    <div>
      <img src={`${PUBLIC_URL}/${img}`} style={styles.cover} alt='' />
    </div>
  );
}

function InfoMeta({ Info }) {
  return (
    <FlexView row style={styles.meta}>
      <i className='fa fa-list-alt' style={{ paddingTop: 3 }} />
      <p style={{ flex: 1, paddingLeft: 3 }}>{Info.businessName || '101'}</p>
      <i className='fa fa-calendar' style={{ paddingTop: 3 }} />{' '}
      <span style={{ paddingLeft: 3 }} />
    </FlexView>
  );
}
function Footer({ Info, customerId }) {
  // <span style={{ flex: 1, textAlign: 'right', paddingRight: 5, color: '#9a9a9a' }}>
  //   100+ studied
  // </span>
  return (
    <FlexView row style={{ padding: 5, alignItems: 'center' }}>
      <Link
        className='btn-borderless'
        style={{ paddingLeft: 8 }}
        to={{
          pathname: `/customer/booking/handyman/${Info._id}/${customerId}`,
          state: { Info, customerId }
        }}
      >
        <i className='fa fa-pencil-square-o' style={{ fontSize: 15 }} /> Choose
        Category
      </Link>
    </FlexView>
  );
}

export default function CustomersTable({ Info, customerId }) {
  return (
    <div
      className='col-sm-6 col-md-4'
      style={{
        marginBottom: 15
      }}
    >
      <div className='jr-course-card'>
        <div style={styles.contentWrapper}>
          <InfoMeta Info={Info} />
          <h4 className='text-center jr-course-card__name'>{Info.email}</h4>
          <p className='jr-course-card__introduction'>{Info.streetAddress}</p>
        </div>

        <hr style={styles.separator} />
        <Footer Info={Info} customerId={customerId} />
      </div>
    </div>
  );
}
