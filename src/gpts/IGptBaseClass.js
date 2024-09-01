/**
 * @interface IGptBaseClass
 */
class IGptBaseClass {
  /**
   * @param {Array} messages
   * @param {string} question
   * @returns {string}
   * @throws {Error}
   */
  constructMessages(messages, query) {
    throw new Error('Method not implemented.');
  }

  /**
   * @param {Array} messages
   * @param {string} assistantResponse
   * @returns {string}
   * @throws {Error}
   */
  addAssistantResponse(messages, assistantResponse) {
    throw new Error('Method not implemented.');
  }

  /**
   * @param {string} question
   * @returns {Promise<string>}
   */
  ask(question) {
    throw new Error('Method not implemented.');
  }

  /**
   * @param {string} question
   * @returns {Promise<string>}
   */
  askAndStream(question) {
    throw new Error('Method not implemented.');
  }
}

export default IGptBaseClass;
