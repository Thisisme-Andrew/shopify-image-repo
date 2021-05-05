  
class ServiceAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceAccessError";
  }
}

export default ServiceAccessError;