import DLBRegisterForm from '../components/landing/dlb-register-form.jsx';
import LandingLayout from '../layouts/landing-layout.jsx';
import Footer from '../components/landing/footer.jsx';

export default function RegisterDlb() {
    return (
        <LandingLayout title={"DLB Bootcamp"} haveHeader={true}>
            <DLBRegisterForm />
            <Footer/>
        </LandingLayout>
    );
}
