// source: https://relatablecode.com/testing-a-react-application-integrating-msw-with-vitest

import { rest } from 'msw';
import { testData } from './testData';

const getHandler = rest.get('http://localhost:8080/transferencias/:id', (req, res, ctx) => {
  // eslint-disable-next-line no-unused-vars
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars
  const { operador } = req.url.searchParams;
  return res(
    ctx.status(200),
    ctx.json(testData)
  )
});

export default getHandler;

