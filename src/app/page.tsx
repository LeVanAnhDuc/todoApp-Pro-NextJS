'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useAppDispatch } from '@/redux/hooks';
import { ChangeEvent, useState } from 'react';

import Table from '@/view/Home/Table';
import { setSearch, setType } from '@/redux/features/projects/projectsSlice';

export default function Home() {
    const dispatch = useAppDispatch();
    const [typeProject, setTypeProject] = useState<string>('All');
    const [searchProject, setSearchProject] = useState<string>('');

    const handleChangeTypeProject = (event: SelectChangeEvent) => {
        setTypeProject(event.target.value as string);
        dispatch(setType(event.target.value as string));
    };

    const handleChangeSearchProject = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchProject(event.target.value as string);
        dispatch(setSearch(event.target.value as string));
    };
    return (
        <main className="min-h-screen w-11/12 m-auto py-10">
            <div className="flex justify-between">
                <div className="font-medium text-2xl">Project</div>
            </div>
            <div className="mt-3 flex gap-3">
                <TextField
                    label="Search project"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Search by name"
                    className="w-60"
                    value={searchProject}
                    onChange={handleChangeSearchProject}
                />
                <FormControl size="small" className="w-60">
                    <InputLabel>Choose Jira products</InputLabel>
                    <Select label="Choose Jira products" value={typeProject} onChange={handleChangeTypeProject}>
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Company-managed'}>Company-managed</MenuItem>
                        <MenuItem value={'Team-managed software'}>Team-managed software</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Table />
        </main>
    );
}
