import * as actions from "./actionTypes";

const tasksDefaultState = {
  tasks: [],
};

export default (state = tasksDefaultState, action) => {
  switch (action.type) {
    case actions.LOAD_TASKS_SUCCESS:
      return { ...state, tasks: [...action.data] };
    case actions.ADD_NEW_TASK_SUCCESS:
      return { ...state, tasks: [...state.tasks, action.data] };
    case actions.COMPLETE_TASK_SUCCESS:
      {
        const index = state.tasks.findIndex(task => task.id === action.data)
        const newTasksArray = [...state.tasks];
        newTasksArray[index].completed = true
        return { ...state, tasks: newTasksArray };
      }
    default:
      return state;
  }
};
