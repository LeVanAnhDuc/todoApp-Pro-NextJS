'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { dataFake } from '@/constants/projects';
import IProject from '@/types/project';

interface ProjectState {
    listProject: IProject[];
}

const initialState: ProjectState = {
    listProject: dataFake,
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<string>) => {
            state.listProject = dataFake;
            if (action.payload === 'All') {
                return;
            } else {
                state.listProject = state.listProject.filter((item) => item.softwareType === action.payload);
            }
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.listProject = dataFake;

            state.listProject = state.listProject.filter((project: IProject) => {
                const keysToSearch: (keyof IProject)[] = ['name', 'key', 'softwareType', 'author'];

                return keysToSearch.some((key: keyof IProject) =>
                    project[key].toLowerCase().includes(action.payload.toLowerCase()),
                );
            });
        },
    },
});

export const { setType, setSearch } = projectsSlice.actions;

export const selectListProject = (state: RootState) => state.projects.listProject;

export default projectsSlice.reducer;
