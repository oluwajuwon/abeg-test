import * as actions from "./actionTypes";

export const loadTasks = (data) => {
  return (dispatch) => {
    dispatch({
      type: actions.LOAD_TASKS_SUCCESS,
      data: data,
    });
  };
};

export const addNewTask = (payload) => {
  return (dispatch) => {
    dispatch({
      type: actions.ADD_NEW_TASK_SUCCESS,
      data: payload,
    });
  };
};

export const completeTask = (payload) => {
  return (dispatch) => {
    dispatch({
      type: actions.COMPLETE_TASK_SUCCESS,
      data: payload,
    });
  };
};