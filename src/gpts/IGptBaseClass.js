/**
 * @interface IGptBaseClass
 */
class IGptBaseClass {
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
