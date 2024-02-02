'use client';

import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useCallback, useState } from 'react';
import Done from '@mui/icons-material/Done';
import Delete from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import ModalCreateTask from '@/view/project-detail/ModalCreateTask';
import ITask from '@/types/task';
import CardTask from '@/components/CardTask';
import { Status } from '@/constants/task';
import {
    addTask,
    removeTask,
    selectListTask,
    setSearchTask,
    updateListTask,
    updateTitleTask,
} from '@/redux/features/tasks/tasksSlice';
import AnimationScale from '@/components/AnimationScale';
import AnimationTran from '@/components/AnimationTran';
import Button from '@/components/Button';

const Board = () => {
    const listTask = useAppSelector(selectListTask);
    const dispatch = useAppDispatch();

    const [openModalCreate, setOpeModalCreate] = useState(false);
    const [statusCurrent, setStatusCurrent] = useState({
        value: '',
        status: '',
    });
    const [checkChangeActive, setCheckChangeActive] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const handleChangeSearchTask = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
        dispatch(setSearchTask(event.target.value as string));
    };

    const toggleModalCreate = useCallback(() => {
        setOpeModalCreate((prev) => !prev);
    }, []);

    const handleChangeNameStatus = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setStatusCurrent({ ...statusCurrent, value: event.target.value });
        },
        [statusCurrent.value],
    );

    const handleActiveStatus = useCallback((status: string) => {
        setStatusCurrent({ ...statusCurrent, value: status, status: status });
        setCheckChangeActive(true);
    }, []);

    const handleDoneChangeNameStatus = () => {
        const updatedTasks = listTask;

        const statusIndex = updatedTasks.findIndex((item) => item.status === statusCurrent.status);
        const checkUniqueIndex = updatedTasks.findIndex(
            (item) => item.status.toUpperCase() === statusCurrent.value.toUpperCase(),
        );

        if (statusCurrent.value === '') {
            alert('Name is require');
            return;
        }

        if (statusIndex !== -1) {
            if (checkUniqueIndex === -1 || checkChangeActive) {
                dispatch(
                    updateTitleTask({
                        indexStatus: statusIndex,
                        title: statusCurrent.value,
                    }),
                );
            } else {
                alert('Name is unique');
                return;
            }
        }

        setCheckChangeActive(false);
        setStatusCurrent({ value: '', status: '' });
    };

    const handleDeleteStatus = () => {
        const updatedTasks = listTask.filter((item) => item.status !== statusCurrent.status);
        dispatch(updateListTask(updatedTasks));
        setStatusCurrent({ value: '', status: '' });
    };

    const handleAddStatus = (statusName: string) => {
        let updatedTasks = [...listTask];
        if (listTask.findIndex((item) => item.status === statusName) === -1) {
            setStatusCurrent({ value: '', status: statusName });
            updatedTasks = [
                ...listTask,
                {
                    status: statusName,
                    data: [],
                },
            ];
        } else {
            alert('Name is require');
        }

        setCheckChangeActive(false);
        dispatch(updateListTask(updatedTasks));
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: ITask, status: string) => {
        e.dataTransfer.setData('taskByStatus', JSON.stringify({ task, status }));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
        e.preventDefault();
        const { task, status } = JSON.parse(e.dataTransfer.getData('taskByStatus'));

        if (status !== newStatus) {
            const newStatusIndex = listTask.findIndex((item) => item.status === newStatus);

            if (newStatusIndex !== -1) {
                dispatch(addTask({ indexStatus: newStatusIndex, task: task }));
                const statusIndex = listTask.findIndex((item) => item.status === status);

                if (statusIndex !== -1) {
                    dispatch(removeTask({ indexStatus: statusIndex, task: task }));
                }
            }
        }
    };

    return (
        <main>
            <div className="flex justify-between items-center gap-10">
                <div className="text-xl font-medium">Name Project</div>
                <TextField
                    label="Search task"
                    autoComplete=""
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Search by name task"
                    className="w-80 "
                    value={search}
                    onChange={handleChangeSearchTask}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto h-[32rem] mt-7">
                {listTask.map((item, index) => (
                    <AnimationTran tranX={-50} key={index}>
                        <div
                            className="flex flex-col  min-w-72 w-72 min-h-[32rem] h-fit bg-gray-100 rounded"
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e, item.status)}
                        >
                            <div className="flex py-1.5 px-3 text-xs font-medium">
                                {statusCurrent.status === item.status ? (
                                    <div className="w-full flex justify-between gap-2 relative">
                                        <input
                                            type="text"
                                            className="py-1.5 px-3 w-full text-sm rounded shadow "
                                            value={statusCurrent.value}
                                            onChange={handleChangeNameStatus}
                                        />
                                        <div className="flex gap-2 absolute right-0 -bottom-10 z-10">
                                            <Button
                                                className="hover:bg-gray-200 m-auto flex place-content-center place-items-center bg-white py-0.5 px-1.5 shadow-xl rounded-lg h-9 w-9"
                                                onClick={handleDoneChangeNameStatus}
                                            >
                                                <Done />
                                            </Button>
                                            <Button
                                                className="hover:bg-gray-200 m-auto flex place-content-center place-items-center bg-white py-0.5 px-1.5 shadow-xl rounded-lg h-9 w-9"
                                                onClick={handleDeleteStatus}
                                            >
                                                <Delete />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <AnimationScale scale={0.5} className="w-full">
                                        <div
                                            className="uppercase font-medium my-auto py-2 px-3"
                                            onClick={() => handleActiveStatus(item.status)}
                                        >
                                            {item.status}
                                        </div>
                                    </AnimationScale>
                                )}
                            </div>
                            {item.data.map((itemData, indexData) => (
                                <div
                                    key={indexData}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, itemData, item.status)}
                                >
                                    <CardTask
                                        itemData={itemData}
                                        indexStatus={index}
                                        delay={index / 10 + (indexData / 10 + 0.1)}
                                    />
                                </div>
                            ))}
                            {item.status === Status.todo && (
                                <>
                                    <AnimationScale scale={0.5} delay={0.5}>
                                        <Button className="hover:bg-gray-200 w-11/12 m-auto flex place-content-center place-items-center">
                                            <div
                                                onClick={toggleModalCreate}
                                                className="flex items-center text-sm font-medium py-2 px-3 "
                                            >
                                                <Add fontSize="small" />
                                                <div> Create issue</div>
                                            </div>
                                        </Button>
                                    </AnimationScale>
                                    <ModalCreateTask
                                        openModalCreate={openModalCreate}
                                        toggleModalCreate={toggleModalCreate}
                                    />
                                </>
                            )}
                        </div>
                    </AnimationTran>
                ))}
                <AnimationScale scale={0.5} delay={0.5} className="h-fit w-fit">
                    <Button
                        className="flex place-content-center place-items-center !px-2 !py-2 rounded bg-gray-100 hover:bg-gray-300"
                        onClick={() => handleAddStatus('')}
                    >
                        <Add />
                    </Button>
                </AnimationScale>
            </div>
        </main>
    );
};

export default Board;
