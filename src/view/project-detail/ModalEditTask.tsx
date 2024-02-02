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

import { updateTask } from '@/redux/features/tasks/tasksSlice';
import { useAppDispatch } from '@/redux/hooks';
import ITask from '@/types/task';
import { useEffect } from 'react';

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
    openModalEdit: boolean;
    toggleModalEdit: () => void;
    indexStatus: number;
    task: ITask;
}

interface IForm {
    title: string;
    typeTask: string;
    description: string;
    assignee: string;
}

export default function ModalEditTask(props: Iprops) {
    const { openModalEdit, toggleModalEdit, indexStatus, task } = props;

    const dispatch = useAppDispatch();

    const schema = yup.object({
        id: yup.number(),
        title: yup.string().required(),
        status: yup.string(),
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
            updateTask({
                indexStatus: indexStatus,
                task: {
                    id: task.id,
                    title: data.title,
                    typeTask: data.typeTask,
                    status: task.status,
                    description: data.description,
                    assignee: data.assignee,
                },
            }),
        );

        toggleModalEdit();
    };

    useEffect(() => {
        setValue('id', task.id);
        setValue('title', task.title);
        setValue('typeTask', task.typeTask);
        setValue('status', task.status);
        setValue('description', task.description);
        setValue('assignee', task.assignee);
    }, []);

    return (
        <Modal open={openModalEdit} onClose={toggleModalEdit}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap justify-between ">
                        <div className="text-xl font-bold">Edit issue</div>
                        <div
                            onClick={toggleModalEdit}
                            className="!cursor-pointer hover:!bg-gray-100 rounded transition p-1.5"
                        >
                            <Clear />
                        </div>
                    </div>
                    <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="ID task"
                                InputProps={{
                                    readOnly: true,
                                }}
                                disabled
                                error={errors.title ? true : false}
                            />
                        )}
                    />
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
                        <Button className="w-60 text-black" onClick={toggleModalEdit}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" className="w-60">
                            Update
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}
