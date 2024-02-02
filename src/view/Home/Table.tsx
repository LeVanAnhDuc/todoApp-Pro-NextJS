'use client';
import { useRouter } from 'next/navigation';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { useAppSelector } from '@/redux/hooks';
import { selectListProject } from '@/redux/features/projects/projectsSlice';
import AnimationTran from '@/components/AnimationTran';

const Table = () => {
    const router = useRouter();
    const listProject = useAppSelector(selectListProject);
    return (
        <>
            <table className="table-auto border-collapse border-b-2 border-gray-500 w-full my-5">
                <thead className="border-b-2 border-gray-500 ">
                    <tr className="text-lg">
                        <th className="text-start font-semibold text-sm !py-3 !pl-5 rounded-tl-lg">Name</th>
                        <th className="text-start font-semibold text-sm !py-3">Key</th>
                        <th className="text-start font-semibold text-sm !py-3">Type</th>
                        <th className="text-start font-semibold text-sm !py-3">Lead</th>
                        <th className="text-end font-semibold text-sm !py-3 !pr-5 rounded-tr-lg">More actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listProject.map((item, index) => (
                        <tr
                            key={index}
                            className="cursor-pointer hover:bg-gray-100 odd:bg-white  even:bg-gray-50 text-xs"
                        >
                            <td className="py-5 pl-5" onClick={() => router.push(`project-detail`)}>
                                <AnimationTran tranY={50} delay={index * 0.2}>
                                    {item.name}
                                </AnimationTran>
                            </td>
                            <td className="uppercase" onClick={() => router.push(`project-detail`)}>
                                <AnimationTran tranY={50} delay={index * 0.2}>
                                    {item.key}
                                </AnimationTran>
                            </td>
                            <td onClick={() => router.push(`project-detail`)}>
                                <AnimationTran tranY={50} delay={index * 0.2}>
                                    {item.softwareType}
                                </AnimationTran>
                            </td>
                            <td onClick={() => router.push(`project-detail`)}>
                                <AnimationTran tranY={50} delay={index * 0.2}>
                                    {item.author}
                                </AnimationTran>
                            </td>
                            <td className="text-end cursor-default pr-5">
                                <AnimationTran tranY={50} delay={index * 0.2}>
                                    <MoreHoriz
                                        className="cursor-pointer active:bg-blue-100 hover:bg-gray-200 rounded transition"
                                        fontSize="medium"
                                    />
                                </AnimationTran>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
