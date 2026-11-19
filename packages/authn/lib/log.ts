const logInfo = (message: string): void => {

  // Strip secrets before logging.
  console.log(message);

};

const logError = (err: Readonly<Error>): void => {

  // Strip secrets before logging.
  console.error(err.message);

};

export { logError, logInfo };
