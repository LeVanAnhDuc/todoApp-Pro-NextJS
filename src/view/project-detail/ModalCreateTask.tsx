'use client';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Clear from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import { addTaskByToDo } from '@/redux/features/tasks/tasksSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Status } from '@/constants/task';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'fit-content',
    bgcolor: 'white',
    p: 4,
};

interface Iprops {
    openModalCreate: boolean;
    toggleModalCreate: () => void;
}

interface IForm {
    title: string;
    typeTask: string;
    description: string;
    assignee: string;
}

export default function ModalCreateTask(props: Iprops) {
    const { openModalCreate, toggleModalCreate } = props;

    const dispatch = useAppDispatch();

    const schema = yup.object({
        title: yup.string().required(),
        typeTask: yup.string().required(),
        description: yup.string().required(),
        assignee: yup.string().required(),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IForm> = (data) => {
        dispatch(
            addTaskByToDo({
                id: 0,
                title: data.title,
                typeTask: data.typeTask,
                status: Status.todo,
                description: data.description,
                assignee: data.assignee,
            }),
        );
        setValue('assignee', '');
        setValue('title', '');
        setValue('description', '');
        setValue('typeTask', '');

        toggleModalCreate();
    };

    return (
        <Modal open={openModalCreate} onClose={toggleModalCreate}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap justify-between ">
                        <div className="text-xl font-bold">Create issue</div>
                        <div
                            onClick={toggleModalCreate}
                            className="!cursor-pointer hover:!bg-gray-100 rounded transition p-1.5"
                        >
                            <Clear />
                        </div>
                    </div>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Summary"
                                placeholder="Enter Summary"
                                error={errors.title ? true : false}
                            />
                        )}
                    />
                    <Controller
                        name="typeTask"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={errors.typeTask ? true : false}>
                                <InputLabel>Issue type</InputLabel>
                                <Select label="Issue type" {...field}>
                                    <MenuItem value={'Bug'}>Bug</MenuItem>
                                    <MenuItem value={'Document'}>Document</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="assignee"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={errors.assignee ? true : false}>
                                <InputLabel>Assignee</InputLabel>
                                <Select label="Assignee" {...field}>
                                    <MenuItem value={'Le Van Anh Duc'}>Le Van Anh Duc</MenuItem>
                                    <MenuItem value={'Le Van Anh Duc 1'}>Le Van Anh Duc 1</MenuItem>
                                    <MenuItem value={'Le Van Anh Duc 2'}>Le Van Anh Duc 2</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={errors.description ? true : false}
                                fullWidth
                                label="Description"
                                placeholder="Enter Description"
                                multiline
                                rows={8}
                            />
                        )}
                    />

                    <div className="float-right">
                        <Button className="w-60 text-black" onClick={toggleModalCreate}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" className="w-60">
                            Save
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}
