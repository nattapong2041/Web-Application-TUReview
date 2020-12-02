export const userConstants = {
  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',

  GETALL_REQUEST: 'USERS_GETALL_REQUEST',
  GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
  GETALL_FAILURE: 'USERS_GETALL_FAILURE',
};

export function users(state = {}, action) {
  switch (action.type) {
    case 'USERS_GETALL_REQUEST':
      return {
        loading: true
      };
    case 'USERS_GETALL_SUCCESS':
      return {
        items: action.users
      };
    case 'USERS_GETALL_FAILURE':
      return {
        error: action.error
      };
    case 'USERS_DELETE_REQUEST':
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case 'USERS_DELETE_SUCCESS':
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case 'USERS_DELETE_FAILURE':
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            const { deleting, ...userCopy } = user;
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}
