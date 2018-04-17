import * as React from 'react';
import { Icon, Notification, Table } from 'bloomer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Done = props => (props.done ?
  <Icon hasTextColor="success" isSize="medium" className="fa fa-check" onClick={() => props.update(!props.done)} /> :
  <Icon hasTextColor="danger" isSize="medium" className="fa fa-times" onClick={() => props.update(!props.done)} />);

Done.propTypes = {
  done: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
};

const Todo = props => (
  <tr>
    <td>
      <Link to={`/task/${props._id}`}>{props.title}</Link>
    </td>
    <td>{props.category}</td>
    <td>{props.place}</td>
    <td>{props.date}</td>
    <td><a><Done done={props.state} update={desired => props.update(desired, props._id)} /></a></td>
    <td><a><Icon hasTextColor="primary" isSize="medium" className="fa fa-edit" onClick={() => { props.openDetail(props._id); }} /></a></td>
  </tr>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  category: PropTypes.string,
  place: PropTypes.string,
  date: PropTypes.string,
  _id: PropTypes.string.isRequired,
  openDetail: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  category: '',
  place: '',
  date: '',
  sameCategory: true,
  samePlace: true,
  sameDate: true,
};

const TodoTable = props => (
  <div>
    <Table isStriped isFullWidth>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Place</th>
          <th>Date</th>
          <th>State</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {props.data.tasks !== undefined ?
          props.data.tasks.map(todo => (
            <Todo
              {...todo}
              update={(desired, id) => props.update(desired, id)}
              openDetail={id => props.show(id)}
            />)) :
          null
        }
        {props.data.category !== undefined ?
          props.data.category.map(todo => (
            <Todo
              {...todo}
              update={(desired, id) => props.update(desired, id)}
              openDetail={id => props.show(id)}
            />)) :
          null
        }
      </tbody>
    </Table>
    {props.data.tasks === undefined && props.data.category === undefined && props.data.error === undefined ? <p>Loading...</p> : null}
    {props.data.error !== undefined ?
      <Notification isColor="danger">
        {props.data.error.networkError.result.errors.map(message => (<p>{message.message} @ {JSON.stringify(message.locations)}</p>))}
      </Notification> :
      null}
  </div>
);

TodoTable.propTypes = {
  data: PropTypes.shape({
    tasks: PropTypes.array,
    category: PropTypes.array,
    error: PropTypes.any,
  }),
};

TodoTable.defaultProps = {
  data: {
    tasks: [],
  },
};

export default TodoTable;
