import * as leaveService from '../services/leave';
import { message } from 'antd';
export default {
    namespace: 'leave',

    state: {
        leaveDatas: [],
    },

    effects: {
        *query({ payload }, { call, put }) {
            const res = yield call(leaveService.query, payload);
            if (res && res.isSuccess) {
                const { data } = res;
                console.log('data', data)
                yield put({ type: 'setLeaveDatas', payload: data });
            }
        },
        *add({ payload }, { call, put }) {
            const res = yield call(leaveService.add, payload)
            // console.log('res====', res);
            if (res && res.isSuccess) {
                // const { message } = res;
                const msg = res.message;
                yield put({ type: 'query' });
                message.success(msg, 4);
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
        setLeaveDatas(state, { payload } ) {
            return { ...state, leaveDatas: payload }
        }

    },
};
