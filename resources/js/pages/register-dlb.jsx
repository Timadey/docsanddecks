import DLBRegisterForm from '../components/landing/dlb-register-form.jsx';
import LandingLayout from '../layouts/landing-layout.jsx';

export default function RegisterDlb() {
    return (
        <LandingLayout title={"DLB Bootcamp"}haveHeader={true}>
            <DLBRegisterForm />
        </LandingLayout>
    );
}
