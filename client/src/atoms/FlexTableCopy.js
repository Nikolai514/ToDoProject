<div id={`${tableId}`} className={`flexTable flexTable--5cols flexTable--collapse `}>
      <div className="flexTable-row flexTable-row--head">
        <div className="flexTable-row flexTable-row--head">
          {titleData.map((item, k) => (
            <div
              key={k}
              className={`flexTable-cell ${item.fieldName}-cell column-heading`}
            >
              {' '}
              {item.title}
            </div>
          ))}
        </div>
      </div>
      {data.map((item, i) => (
        <React.Fragment key={'row' + i}>
          <div className={`flexTable-row ${item.completed ? 'flexTable-row-completed' : ''}`}>
            {titleData.map((title, k) => {
              if (title.fieldName === 'date') {
                return (
                  <Col
                    className={`flexTable-cell`}
                    key={'column' + k}
                  >
                    <div className="flexTable-cell--heading">{title.title}</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>
                      {title.fieldName === 'date' && formatDate(new Date(`${item.date}`))}
                    </div>
                  </Col>
                );
              }
              if (title.fieldName === 'tags') {
                return (
                  <Col
                    className={`flexTable-cell`}
                    key={'column' + k}
                  >
                    <div className="flexTable-cell--heading">{title.title}</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>{item.tags === 1 ? 'Low' : item.tags === 2 ? 'Medium' : 'High'}</div>
                    {/* {item.tags.map((tag) => (
                      <div key={tag._id} className={`flexTable-cell--content ${title.fieldName}-content`}>{tag.name}</div>
                    ))} */}
                    {/* <div className={`flexTable-cell--content ${title.fieldName}-content`}>Low</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>Medium</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>High</div> */}
                  </Col>
                );
              }
              if (item[title.fieldName]) {
                return (
                  <Col
                    className={`flexTable-cell`}
                    key={'column' + k}
                  >
                    <div className="flexTable-cell--heading">{title.title}</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>
                      {item[title.fieldName]}
                    </div>
                  </Col>
                );
              }
              return (
                <Col
                  className={`flexTable-cell ${title.fieldName}-cell`}
                  key={`icon${k + k}`}
                  name={item.id}
                >
                  <div className="flexTable-cell--heading">{title.title}</div>
                  <div className={`flexTable-cell--content ${title.fieldName}-content`}>
                    {title.icons?.map((icon, i) => (
                      <Icon
                        key={i}
                        name={item._id}
                        icon={'fa' + icon}
                        onClick={iconClick}
                        id={icon}
                        size={'1x'}
                        fixedWidth
                      />
                    ))}
                  </div>
                </Col>
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </div>