import { errorType } from '../constants';

const getErrorCode = (errorName) => errorType[errorName];

export default getErrorCode;
