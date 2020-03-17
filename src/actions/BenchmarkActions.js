import axios from 'axios';
import { baseApi } from '../utils/Const';

const GET_BENCHMARK = (compareId, fromDate) => (dispatch) => {
  axios
    .get(`${baseApi}/stashaway_benchmark`, {
      params: {
        compareId,
        fromDate,
      },
    })
    .then((res) => {
      dispatch({
        type: 'GET_BENCHMARK',
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_BENCHMARK_ERR',
        payload: error.response,
      });
    });
};

export default GET_BENCHMARK;
