import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/v2/stateMachine', {
      method: 'GET'
  });
}

export async function add(params) {
  return request('/v2/stateMachine', {
      method: 'POST',
      body: {
        ...params,
        method: 'POST',
      },
  });
}

// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }