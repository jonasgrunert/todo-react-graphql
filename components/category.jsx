import { Button, Columns, Column, Container, Field, Control, Input } from 'bloomer';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as ReduxForm from 'redux-form';
import TodoTable from './table';

const Item = field => <Input {...field.input} isSize="small" type="text" placeholder="Category" />;

const Form = props => (
  <Container hasTextAlign="centered">
    <Columns isCentered>
      <Column isSize="1/2">
        <br />
        <form onSubmit={props.handleSubmit}>
          <Field>
            <Control>
              <ReduxForm.Field name="category" component={Item} />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button isSize="small" isColor="info" type="submit" isPulled="right">
                Search
              </Button>
            </Control>
          </Field>
        </form>
      </Column>
    </Columns>
    <TodoTable {...props} />
  </Container>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ReduxForm.reduxForm({ form: 'search' })(Form);
