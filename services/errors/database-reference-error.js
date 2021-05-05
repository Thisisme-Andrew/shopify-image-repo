class DatabaseReferenceError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseReferenceError";
  }
}

export default DatabaseReferenceError;