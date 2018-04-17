import * as React from 'react';
import { Box, Icon, Card, CardContent, CardHeader, CardHeaderIcon, CardHeaderTitle, Content } from 'bloomer';
import PropTypes from 'prop-types';

const Done = props => (props.done ?
  <Icon isSize="medium" className="fa fa-check" /> :
  <Icon isSize="medium" className="fa fa-times" />);

Done.propTypes = {
  done: PropTypes.bool.isRequired,
};


const SameStuff = props => (
  <Box>
    <b>{props.title}</b>
    {props.tasks.map(todo => <p>{todo.title}<Done done={todo.state} /></p>)}
  </Box>
);

SameStuff.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

const Task = props => (
  <Card>
    <CardHeader>
      <CardHeaderTitle>
        {props.title}
      </CardHeaderTitle>
      <CardHeaderIcon>
        <Done done={props.state} />
      </CardHeaderIcon>
    </CardHeader>
    <CardContent>
      <Content>
        {props.date !== null ? <small><Icon isSize="medium" className="fa fa-calendar" />{props.date}<br /></small> : null}
        {props.place !== null ? <small><Icon isSize="medium" className="fa fa-globe" />{props.place}<br /></small> : null}
        {props.notes !== null ? <p><Icon isSize="medium" className="fa fa-sticky-note" />{props.notes}</p> : null}
        {props.category !== null ? <p><Icon isSize="medium" className="fa fa-ellipsis-v" />{props.category}</p> : null}
        {props.sameCategory === true || props.sameCategory.length === 0 ? null : <SameStuff title="Same Category" tasks={props.sameCategory} />}
        {props.samePlace === true || props.samePlace.length === 0 ? null : <SameStuff title="Same Place" tasks={props.samePlace} />}
        {props.sameDate === true || props.sameDate.length === 0 ? null : <SameStuff title="Same Date" tasks={props.sameDate} />}
      </Content>
    </CardContent>
  </Card>
);

Task.propTypes = {
  title: PropTypes.string,
  state: PropTypes.bool,
  date: PropTypes.string,
  place: PropTypes.string,
  notes: PropTypes.string,
  category: PropTypes.string,
  sameCategory: PropTypes.arrayOf({
    title: PropTypes.string,
    state: PropTypes.bool,
  }),
  samePlace: PropTypes.arrayOf({
    title: PropTypes.string,
    state: PropTypes.bool,
  }),
  sameDate: PropTypes.arrayOf({
    title: PropTypes.string,
    state: PropTypes.bool,
  }),
};

Task.defaultProps = {
  title: 'Example',
  state: false,
  date: '2018-07-15',
  place: 'Hamburg',
  notes: 'Lorem ipsum....',
  category: 'Default',
  samePlace: [{
    title: 'Another one',
    state: false,
  }],
  sameCategory: [{
    title: 'A third one',
    state: false,
  }],
  sameDate: [{
    title: 'A fourth one',
    state: false,
  }],
};

const TaskCard = props => (props.data.task !== undefined ? <Task {...props.data.task} /> : <p>Loading...</p>);

export default TaskCard;
