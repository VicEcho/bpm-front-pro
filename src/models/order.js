import * as orderService from '../services/order';
import { message } from 'antd';
export default {
    namespace: 'order',

    state: {
        orders: [],
    },

    effects: {
        *query({ payload }, { call, put }) {
            const res = yield call(orderService.query, payload);
            if (res && res.isSuccess) {
                const { data } = res;
                console.log('data', data)
                yield put({ type: 'setOrders', payload: data });
            }
        },
    },

    reducers: {
        // queryList(state, action) {
        //   return {
        //     ...state,
        //     list: action.payload,
        //   };
        // },
        setOrders(state, { payload } ) {
            return { ...state, orders: payload }
        }

    },
};
