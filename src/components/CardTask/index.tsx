import React, { useCallback, useState } from 'react';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';

import { useAppDispatch } from '@/redux/hooks';
import ITask from '@/types/task';
import { removeTask } from '@/redux/features/tasks/tasksSlice';
import ModalEditTask from '@/view/project-detail/ModalEditTask';
import PopoverHover from '../PopoverHover';
import AnimationTran from '../AnimationTran';

interface Iprops {
    itemData: ITask;
    indexStatus: number;
    delay: number;
}

const CardTask = (props: Iprops) => {
    const { itemData, indexStatus, delay } = props;
    const dispatch = useAppDispatch();

    const [openPopover, setOpenPopover] = useState<HTMLDivElement | null>(null);
    const [openModalEdit, setOpeModalEdit] = useState(false);

    const handleClickPopover = (event: React.MouseEvent<HTMLDivElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const open = Boolean(openPopover);

    const handleDeleteTask = () => {
        dispatch(removeTask({ indexStatus: indexStatus, task: itemData }));
    };

    const toggleModalEdit = useCallback(() => {
        setOpeModalEdit((prev) => !prev);
    }, []);

    return (
        <>
            <AnimationTran tranY={50} delay={delay}>
                <div className="flex flex-col gap-2 bg-white m-1.5 p-3  border-2 shadow rounded-lg text-sm hover:scale-105 transition">
                    <div className="flex justify-between gap-1">
                        <PopoverHover title={itemData.description}>{itemData.title}</PopoverHover>
                        <div onClick={handleClickPopover}>
                            <MoreHoriz
                                className="active:bg-blue-100 hover:bg-gray-200 rounded transition"
                                fontSize="medium"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div>
                            <span className="font-bold">#{itemData.id}</span>-
                            <span
                                className={`${
                                    itemData.typeTask === 'Bug' ? 'text-red-500' : 'text-blue-500'
                                } font-bold `}
                            >
                                {itemData.typeTask}
                            </span>
                        </div>
                        <div className="text-xs flex items-center gap-1">
                            {itemData.assignee}
                            <Avatar src="/broken-image.jpg" className="!h-8 !w-8" />
                        </div>
                    </div>
                </div>
            </AnimationTran>

            <Popover
                open={open}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className=" rounded">
                    <div className="w-20 px-2.5 py-2 text-sm hover:bg-gray-100 transition" onClick={toggleModalEdit}>
                        Edit
                    </div>
                    <div className="w-20 px-2.5 py-2 text-sm hover:bg-gray-100 transition" onClick={handleDeleteTask}>
                        Datele
                    </div>
                </div>
            </Popover>

            <ModalEditTask
                openModalEdit={openModalEdit}
                toggleModalEdit={toggleModalEdit}
                indexStatus={indexStatus}
                task={itemData}
            />
        </>
    );
};

export default CardTask;
