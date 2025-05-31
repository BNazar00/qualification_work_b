import "../components/clubPage/sider/css/SocialMedia.css";
import MaskIcon from "../components/MaskIcon";

const ContactsInfoUtil = ({ label, contacts }) => {
    const contactsArray = Array.from(contacts);

    function validatePhone(phone) {
        let numbers = (phone + "").replace(/\D/g, "");
        let result;
        switch (numbers.length) {
            case 9:
                result = `+380${numbers}`;
                break;
            case 10:
                result = `+38${numbers}`;
                break;
            case 11:
                result = `+3${numbers}`;
                break;
            case 12:
                result = `+${numbers}`;
                break;
            default:
                result = numbers;
                break;
        }
        return result;
    }

    let validatedContactData = (contact) => {
        if (contact.contactType.name === "Телефон")
            return validatePhone(contact.contactData);
        else
            return <a href={contact.contactData} target={"blank"}>{contact.contactData}</a>
    };

    return (
        <div className="social-media">
            <span className="label">{label}</span>
            <div className="links">
                {contactsArray.map((contact) => (
                    <div className="contact" key={contact}>
                        <MaskIcon
                            maskColor="#0D2C95"
                            iconUrl={contact.contactType.urlLogo}
                        />
                        <span className="contact-name">
                            {validatedContactData(contact)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactsInfoUtil;
