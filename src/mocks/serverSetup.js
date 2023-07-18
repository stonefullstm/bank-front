// source: https://relatablecode.com/testing-a-react-application-integrating-msw-with-vitest
import { setupServer } from 'msw/node';
import getHandler from './getHandler';

const server = setupServer(getHandler,/*anotherHandler*/)

export {
  server,
}
