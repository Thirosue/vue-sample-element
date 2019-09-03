import { sprintf } from 'sprintf-js';
import store, { MUTATION_TYPES } from '@/store';

export default class ErrorHandler {
  static async apiHandleErr(error) {
    try {
      const { response } = error;
      const json = await response.json();
      if (response.status === 400) {
        if (json.field_errors) {
          const messages = ErrorHandler.createMessage(json.field_errors)
          store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, messages);
        } else if (json.message) {
          store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, [json.message]);
        }
      } else {
        throw new Error(error);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static createMessage(fieldErrors) {
    if (!fieldErrors || fieldErrors.length === 0) return [];
    const messages = [];
    fieldErrors.forEach(fieldError => {
      const { field_name, error_message } = fieldError; // eslint-disable-line
      if (field_name && error_message) { // eslint-disable-line
        const errorMessageBase = error_message.replace('{0}', '%s'); // eslint-disable-line
        messages.push(sprintf(errorMessageBase, field_name));  // eslint-disable-line
      }
    });
    return messages;
  }
}
