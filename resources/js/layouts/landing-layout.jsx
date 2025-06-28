import { Head, usePage } from '@inertiajs/react';
import Header from '../components/landing/header.jsx';

const LandingLayout = ({ title, haveHeader, children }) => {
    (function () {
        var options = {
            email: "info@docsanddecks.com", // Email
            email_color: "#606060", // Email button color
            email_label: "Email", // Email button label
            linkedin: "https://linkedin.com/company/docsdecks", // LinkedIn
            linkedin_color: "#007ebb", // LinkedIn button color
            linkedin_label: "LinkedIn", // LinkedIn button label
            twitter: "docsdecks", // Twitter User ID
            twitter_color: "#000000", // Twitter button color
            twitter_label: "X.com", // Twitter button label
            whatsapp: usePage().props.support_number, // WhatsApp number
            whatsapp_color: "#4dc247", // WhatsApp button color
            whatsapp_label: "WhatsApp", // WhatsApp button label
            whatsapp_agent_image_1: "https://static.getbutton.io/img/flag.jpg?v=1", // WhatsApp agent image 1
            whatsapp_agent_image_4: "https://static.getbutton.io/img/flag.jpg?v=1", // WhatsApp agent image 4
            whatsapp_agent_image_5: "https://static.getbutton.io/img/flag.jpg?v=1", // WhatsApp agent image 5
            pre_filled_message: "Hello, I have a few questions...", // WhatsApp pre-filled message
            whatsapp_popup_title: "Start a Conversation", // WhatsApp popup title
            whatsapp_popup_subtitle: "Click one of our members below to chat", // WhatsApp popup subtitle
            greeting: true, // Greeting message enabled
            company_logo_url: "//storage.getbutton.io/widget/5e/5e56/5e56af27509c0d35cb52898619f0e5c2/logo.png", // URL of company logo (png, jpg, gif)
            greeting_message: "Hey 👋 What’s up? Need help with something? Slide into our dm! We will be happy to help!", // Text of greeting message
            greeting_messengers: true, // Greeting messengers may be 'true' or 'false'
            greeting_cookie: 21600, // Greeting cookie lifetime
            greeting_message_delay: 10, // Greeting message delay
            greeting_agent_name: "Cove", // Greeting agent name
            greeting_agent_position: "Support", // Greeting agent position
            greeting_start_chat_with: "Message us on", // Greeting start chat with text
            greeting_style: "alternative", // Greeting style may be 'classic' or 'alternative'
            greeting_direction: "column", // Greeting direction may be 'column' or 'row'or 'center'
            call_to_action: "Hey, we are right here! 👋", // Call to action message
            button_color: "#064aea", // Color of button
            order: "twitter,whatsapp,linkedin,email", // Order of buttons
            ga: true, // Google Analytics enabled
            border: true, // Add button border
            animation: true, // Animation enabled
            button_animation: "moveIn", // Button animation
            button_shadow: 32, // Button shadow
            domain: "", // site domain
        };
        var proto = 'https:', host = "getbutton.io", url = proto + '//static.' + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();
    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                {/*<link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />*/}
            </Head>
            {haveHeader && <Header className="mb-10" />}
            <div className="min-h-screen bg-white text-black">
                {children}
            </div>
        </>
    );
};

export default LandingLayout;
