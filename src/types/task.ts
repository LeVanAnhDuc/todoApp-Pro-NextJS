export default interface ITask {
    id: number;
    title: string;
    typeTask: string;
    status?: string;
    description: string;
    assignee: string;
}
