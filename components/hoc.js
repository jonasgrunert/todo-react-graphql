import * as ReactRedux from 'react-redux';
import * as React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import * as ReduxForm from 'redux-form';

import FormWrapper from './input';
import DetailModal, { EditForm } from './modalform';
import TodoTable from './table';
import TaskCard from './card';
import Category from './category';

import { toggleDetails, toggleEdit } from '../redux/actions';
import { addItem, editItem } from '../graphql/mutations.gql';
import { standard, edit, single, category } from '../graphql/queries.gql';

// SingleAdd
const mapDispatchToPropsSingle = (dispatch, ownProps) => ({
  onSubmit: values => ownProps.mutate({
    variables: {
      task: {
        title: values.item,
      },
    },
    refetchQueries: ['edit', 'standard', 'date', 'place', 'category'],
  }),
  toggleModal: () => dispatch(toggleDetails(true)),
});

export const GraphQLAddSingle = compose(
  graphql(addItem),
  ReactRedux.connect(null, mapDispatchToPropsSingle),
)(FormWrapper);


// ModalAdd
const mapStateToPropsModal = state => ({
  show: state.visibility,
});

const mapDispatchToPropsModal = (dispatch, ownProps) => ({
  close: () => dispatch(toggleDetails(false)),
  onSubmit: async (values) => {
    await ownProps.mutate({
      variables: {
        task: {
          ...values,
        },
      },
      refetchQueries: ['edit', 'standard', 'date', 'place', 'category'],
    });
    dispatch(toggleDetails(false));
  },
});

export const GraphQLAddExtended = compose(
  graphql(addItem),
  ReactRedux.connect(mapStateToPropsModal, mapDispatchToPropsModal),
)(DetailModal);

// ModalEdit
const mapStateToPropsEdit = state => ({
  show: state.edit,
});

const mapDispatchToPropsEdit = (dispatch, ownProps) => ({
  close: () => dispatch(toggleEdit(false)),
  onSubmit: async (values) => {
    await ownProps.mutate({
      variables: {
        task: {
          ...values,
        },
      },
      refetchQueries: ['edit', 'standard', 'date', 'place', 'category'],
    });
    dispatch(toggleEdit(false));
  },
});

export const GraphQLEdit = compose(
  graphql(editItem),
  ReactRedux.connect(mapStateToPropsEdit, mapDispatchToPropsEdit),
)(EditForm);


// LoadTable with Data
const mapDispatchToPropsData = (dispatch, ownProps) => ({
  show: async (id) => {
    dispatch(toggleEdit(true));
    const result = await ownProps.client.query({
      query: edit,
      variables: {
        id,
      },
    });
    Object.keys(result.data.task).forEach((key) => {
      if (key !== '__typename') {
        dispatch(ReduxForm.change('editForm', key, result.data.task[key]));
      }
    });
  },
  update: (desired, id) => {
    ownProps.mutate({
      variables: {
        task: {
          _id: id,
          state: desired,
        },
      },
      refetchQueries: ['edit', 'standard', 'date', 'place', 'category'],
    });
  },
});

export const GraphQLTable = compose(
  withApollo,
  graphql(editItem),
  graphql(standard),
  ReactRedux.connect(null, mapDispatchToPropsData),
)(TodoTable);

// SingleCard
export const GraphQLSingleCard = graphql(single, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  }),
})(TaskCard);

// CategoryTable
const mapStateToPropsCategory = state => ({
  category: state.form.search !== undefined && state.form.search.values !== undefined ? state.form.search.values.category : 'shopping',
});

const mapDispatchToPropsCategory = (dispatch, ownProps) => ({
  onSubmit: () => {
    ownProps.data.refetch({
      title: ownProps.category,
    });
  },
});

export const CategoryTable = compose(
  ReactRedux.connect(mapStateToPropsCategory, null),
  graphql(category, {
    options: props => ({
      variables: {
        title: props.category,
      },
    }),
  }),
  ReactRedux.connect(null, mapDispatchToPropsCategory),
)(Category);
