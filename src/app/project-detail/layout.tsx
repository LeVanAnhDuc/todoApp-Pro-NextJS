import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-11/12 m-auto py-10">
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/" className="hover:underline">
                    Project
                </Link>
                <Typography color="text.primary">Name project</Typography>
            </Breadcrumbs>
            <div className="mt-2">{children}</div>
        </main>
    );
}
