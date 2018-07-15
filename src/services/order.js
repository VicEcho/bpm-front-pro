import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/v2/orders', {
      method: 'GET'
  });
}


// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }