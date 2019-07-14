import React from 'react';

export default function BusinessDetailDisplay(props) {
  const { business } = props;
  return (
    <div className="jr-detail_container">
      <div className="jr-detail_cover">
        <div className="row">
          <div className="col-sm-12">
            <div className="jr-detail_cover_title_block">
              <h2>{`${business.name}`}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="jr-detail_content">
        <div className="row">
          <div className="col-sm-6" style={{ paddingTop: 20 }}>
            {business.description}
          </div>
          <div className="col-sm-6">
            <ul className="jr-detail_content_list">
              <li>
                <span className="item_label">Course name</span>
                <span className="item_value">{business.name}</span>
              </li>
              <li>
                <span className="item_label">Course code</span>
                <span className="item_value">{business.code}</span>
              </li>
              <li>
                <span className="item_label">Enrollment</span>
                <span className="item_value">
                  {/* {course.students && business.students.length} student(s) */}
                </span>
              </li>
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
