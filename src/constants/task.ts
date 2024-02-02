import ITask from '@/types/task';

export const Status = {
    todo: 'todo',
    inProcess: 'inProcess',
    completed: 'completed',
};

export const dataFake: ITask[] = [
    {
        id: 1,
        title: 'Lỗi code giao diện người dùng đăng nhập',
        typeTask: 'Bug',
        status: Status.todo,
        assignee: 'Le Van Anh Duc',
        description: 'Mô tả chi tiết của task này là bla bla bla bla bla bla 1',
    },
    {
        id: 2,
        title: 'Lỗi code giao diện người dùng đăng kí',
        typeTask: 'Bug',
        status: Status.todo,
        assignee: 'Le Van Anh Duc',
        description: 'Mô tả chi tiết của task này là bla bla bla bla bla bla 2',
    },
    {
        id: 3,
        title: 'Lỗi code giao diện người dùng trang chủ',
        typeTask: 'Bug',
        status: Status.inProcess,
        assignee: 'Le Van Anh Duc',
        description: 'Mô tả chi tiết của task này là bla bla bla bla bla bla 3',
    },
    {
        id: 4,
        title: 'Lỗi code giao diện admin đăng nhập',
        typeTask: 'Bug',
        status: Status.inProcess,
        assignee: 'Le Van Anh Duc',
        description: 'Mô tả chi tiết của task này là bla bla bla bla bla bla 4',
    },
    {
        id: 5,
        title: 'Lỗi code giao diện admin thống kê',
        typeTask: 'Bug',
        status: Status.completed,
        assignee: 'Le Van Anh Duc',
        description: 'Mô tả chi tiết của task này là bla bla bla bla bla bla 5',
    },
];
