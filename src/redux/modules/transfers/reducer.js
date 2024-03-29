import { GET_TRANSFERS, GET_TRANSFER, ADD_TRANSFER, CLEAR_ADDED_TRANSFERS } from './types';

const initialState = {
  list: {
    data: [],
    isLoaded: false,
    error: {},
  },
  active: {
    data: {},
    isLoaded: false,
    error: {},
  },
  adding: {
    data: {},
    isLoading: false,
    error: {},
  },
  addedTransfers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSFERS.REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          isLoaded: action.meta.polling,
        },
      };

    case GET_TRANSFERS.SUCCESS:
      return {
        ...state,
        list: {
          data: action.payload.data,
          isLoaded: true,
          error: {},
        },
      };

    case GET_TRANSFERS.FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.payload.error,
          isLoaded: true,
        },
      };

    case GET_TRANSFER.REQUEST:
      return {
        ...state,
        active: {
          ...state.active,
          isLoaded: false,
        },
      };

    case GET_TRANSFER.SUCCESS:
      return {
        ...state,
        active: {
          data: action.payload.data,
          isLoaded: true,
          error: {},
        },
      };

    case GET_TRANSFER.FAILURE:
      return {
        ...state,
        active: {
          ...state.active,
          error: action.payload.error,
          isLoaded: true,
        },
      };

    case ADD_TRANSFER.REQUEST:
      return {
        ...state,
        adding: {
          isLoading: true,
          error: {},
        },
      };

    case ADD_TRANSFER.SUCCESS:
      return {
        ...state,
        adding: {
          data: action.payload.data,
          isLoading: false,
          error: {},
        },
      };

    case ADD_TRANSFER.FAILURE:
      return {
        ...state,
        adding: {
          data: {},
          isLoading: false,
          error: action.payload.error,
        },
      };

    case CLEAR_ADDED_TRANSFERS:
      return {
        ...state,
        adding: initialState.adding,
      };

    default:
      return state;
  }
};
