import { Box, Button, Control, Field, FieldBody, Input, Label, Modal, ModalBackground, ModalContent, ModalClose, TextArea } from 'bloomer';
import * as React from 'react';
import * as ReduxForm from 'redux-form';
import PropTypes from 'prop-types';

const TextInput = field => <Input {...field.input} placeholder={field.placeholder} type="text" />;
const AreaInput = field => <TextArea {...field.input} placeholder="I should not forget...." />;

const DetailModal = props => (
  <Modal isActive={props.show}>
    <ModalBackground />
    <ModalContent>
      <Box>
        <form onSubmit={props.handleSubmit}>
          <Field>
            <FieldBody>
              <Field>
                <Label>Title</Label>
                <Control isExpanded>
                  <ReduxForm.Field component={TextInput} placeholder="Title" name="title" />
                </Control>
              </Field>
              <Field>
                <Label>Category</Label>
                <Control>
                  <ReduxForm.Field component={TextInput} placeholder="Category" name="category" />
                </Control>
              </Field>
            </FieldBody>
          </Field>
          <Field>
            <FieldBody>
              <Field>
                <Label>Date</Label>
                <Control isExpanded>
                  <ReduxForm.Field component={TextInput} placeholder="Date" name="date" />
                </Control>
              </Field>
              <Field>
                <Label>Place</Label>
                <Control>
                  <ReduxForm.Field component={TextInput} placeholder="Place" name="place" />
                </Control>
              </Field>
            </FieldBody>
          </Field>
          <Field>
            <FieldBody>
              <Field>
                <Label>Notes</Label>
                <Control>
                  <ReduxForm.Field component={AreaInput} name="notes" />
                </Control>
              </Field>
            </FieldBody>
          </Field>
          <Field>
            <FieldBody>
              <Button isSize="medium" isColor="info" type="submit">
                Submit
              </Button>
            </FieldBody>
          </Field>
        </form>
      </Box>
    </ModalContent>
    <ModalClose onClick={props.close} />
  </Modal>
);

DetailModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

DetailModal.defaultProps = {
  show: false,
};

export const EditForm = ReduxForm.reduxForm({ form: 'editForm' })(DetailModal);
export default ReduxForm.reduxForm({ form: 'extendedForm' })(DetailModal);
