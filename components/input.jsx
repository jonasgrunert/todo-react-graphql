import { Button, Columns, Column, Container, Field, Control, Input } from 'bloomer';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as ReduxForm from 'redux-form';

const Item = field => <Input {...field.input} isSize="large" type="text" placeholder="What do you have to do?" />;

const Form = props => (
  <Container hasTextAlign="centered" >
    <Columns isCentered>
      <Column isSize="1/2">
        <form onSubmit={props.handleSubmit}>
          <Field>
            <Control>
              <ReduxForm.Field name="item" component={Item} />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button isSize="medium" isColor="white" onClick={props.toggleModal}>
                Details
              </Button>
              <Button isSize="medium" isColor="white" type="submit" isPulled="right">
                Submit
              </Button>
            </Control>
          </Field>
        </form>
      </Column>
    </Columns>
  </Container>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ReduxForm.reduxForm({ form: 'simpleAdd' })(Form);
