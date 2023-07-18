// source: https://relatablecode.com/testing-a-react-application-integrating-msw-with-vitest

import { rest } from 'msw';
import { testData } from './testData';

const postHandler = rest.get('http://localhost:8080/transferencias/1', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(testData)
  )
});

export default postHandler;

