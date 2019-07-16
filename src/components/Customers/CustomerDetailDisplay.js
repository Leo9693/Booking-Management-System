import React from 'react';

export default function InfoDetailDisplay(props) {
  const { Info } = props;
  return (
    <div className='jr-detail_container'>
      <div className='jr-detail_cover'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='jr-detail_cover_title_block'>
              <h2>{`${Info.customerName} ${Info.preferName}`}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className='jr-detail_content'>
        <div className='row'>
          <div className='col-sm-6'>
            <ul className='jr-detail_content_list'>
              <li>
                <span className='item_label'>email</span>
                <span className='item_value'>{Info.email}</span>
              </li>
              <li>
                <span className='item_label'>phone</span>
                <span className='item_value'>{Info.phone}</span>
              </li>
              {Info.booking && (
                <li>
                  <span className='item_label'>Order(s)</span>
                  <span className='item_value'>
                    {Info.booking && Info.booking}
                  </span>
                </li>
              )}
              {/* <li>
                <span className="item_label">End at</span>
                <span className="item_value">{}</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
