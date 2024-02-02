import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/tasksSlice';
import projectsSlice from './features/projects/projectsSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        projects: projectsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
