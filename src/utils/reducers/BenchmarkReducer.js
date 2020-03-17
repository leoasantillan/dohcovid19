const initialState = {
  portfolio_benchmark: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'GET_BENCHMARK':
    return {
      ...state,
      portfolio_benchmark: action.payload,
    };
  default:
    return state;
  }
}
