import { Head, Link, usePage } from '@inertiajs/react';
import Hero from '../components/landing/hero.jsx';
import Header from '../components/landing/header.jsx';
import DLBRegisterForm from '../components/landing/dlb-register-form.jsx';

export default function RegisterDlb() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="DLB Bootcamp">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Header className="mb-10"/>
            <DLBRegisterForm />
        </>
    );
}
