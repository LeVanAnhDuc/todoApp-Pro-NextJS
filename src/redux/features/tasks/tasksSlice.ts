'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import ITask from '@/types/task';
import { Status, dataFake } from '@/constants/task';

interface TaskState {
    listTask: {
        status: string;
        data: ITask[];
    }[];
}

const initialState: TaskState = {
    listTask: [
        {
            status: Status.todo,
            data: dataFake.filter((data) => data.status === Status.todo),
        },
        {
            status: Status.inProcess,
            data: dataFake.filter((data) => data.status === Status.inProcess),
        },
        {
            status: Status.completed,
            data: dataFake.filter((data) => data.status === Status.completed),
        },
    ],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateListTask: (
            state,
            action: PayloadAction<
                {
                    status: string;
                    data: ITask[];
                }[]
            >,
        ) => {
            state.listTask = action.payload;
        },
        updateTitleTask: (state, action: PayloadAction<{ indexStatus: number; title: string }>) => {
            const updatedListTask = state.listTask.map((item, index) => {
                if (index === action.payload.indexStatus) {
                    return { ...item, status: action.payload.title };
                }
                return item;
            });

            state.listTask = updatedListTask;
        },
        addTask: (state, action: PayloadAction<{ indexStatus: number; task: ITask }>) => {
            const updatedListTask = state.listTask.map((item, index) => {
                if (index === action.payload.indexStatus) {
                    return { ...item, data: [...item.data, action.payload.task] };
                }
                return item;
            });

            state.listTask = updatedListTask;
        },
        removeTask: (state, action: PayloadAction<{ indexStatus: number; task: ITask }>) => {
            const updatedListTask = state.listTask.map((item, index) => {
                if (index === action.payload.indexStatus) {
                    return { ...item, data: item.data.filter((item) => item.id !== action.payload.task.id) };
                }
                return item;
            });

            state.listTask = updatedListTask;
        },
        addTaskByToDo: (state, action: PayloadAction<ITask>) => {
            let total = 0;

            state.listTask.forEach((item) => {
                total += item.data.length;
            });

            const indexTask = state.listTask.findIndex((item) => item.status === Status.todo);
            state.listTask[indexTask].data.push({ ...action.payload, id: total + 1 });
        },
        setSearchTask: (state, action: PayloadAction<string>) => {
            const filteredListTask = [
                {
                    status: Status.todo,
                    data: dataFake.filter(
                        (data) =>
                            data.status === Status.todo &&
                            data.title.toLowerCase().includes(action.payload.toLowerCase()),
                    ),
                },
                {
                    status: Status.inProcess,
                    data: dataFake.filter(
                        (data) =>
                            data.status === Status.inProcess &&
                            data.title.toLowerCase().includes(action.payload.toLowerCase()),
                    ),
                },
                {
                    status: Status.completed,
                    data: dataFake.filter(
                        (data) =>
                            data.status === Status.completed &&
                            data.title.toLowerCase().includes(action.payload.toLowerCase()),
                    ),
                },
            ];
            state.listTask = filteredListTask;
        },
        updateTask: (state, action: PayloadAction<{ indexStatus: number; task: ITask }>) => {
            const updatedListTask = state.listTask.map((item, index) => {
                if (index === action.payload.indexStatus) {
                    const updatedData = item.data.filter((task) => task.id !== action.payload.task.id);
                    const updatedTask = action.payload.task;
                    return {
                        ...item,
                        data: [...updatedData, updatedTask],
                    };
                }
                return item;
            });

            state.listTask = updatedListTask;
        },
    },
});

export const { updateListTask, updateTitleTask, addTask, removeTask, addTaskByToDo, setSearchTask, updateTask } =
    tasksSlice.actions;

export const selectListTask = (state: RootState) => state.tasks.listTask;

export default tasksSlice.reducer;
