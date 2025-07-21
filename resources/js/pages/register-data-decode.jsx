
import LandingLayout from '../layouts/landing-layout.jsx';
import DataDecodeRegisterForm from '../components/datadecode/register-dd.jsx';
import Footer from '../components/landing/footer.jsx';

export default function RegisterDataDecode() {
    return (
        <LandingLayout title={"Data Decode Program"} haveHeader={true}>
            <DataDecodeRegisterForm />
            <Footer/>
        </LandingLayout>
    );
}
