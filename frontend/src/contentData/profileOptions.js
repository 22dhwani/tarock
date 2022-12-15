import editInfo from '../assets/editInfo.svg';
import modifyAvatar from '../assets/modifyAvatar.svg';
import about from '../assets/about.svg';
import contact from '../assets/contact.svg';
import logoutButton from '../assets/profile/logout.svg';

//link also serves as an on click function to be performed (condition: !includes('/'))
const profileOptions = [
    // [editInfo, modifyAvatar],
    // [about,contact],
    // [logout]
    [{
        button: editInfo,
        link: '/editProfile'
    },
    {
        button: modifyAvatar,
        link: '/signin',
        state: { stage: 'avatar' }
    }],
    [
    {
        button: about,
        link: 'https://tarock.webflow.io/about-us'
    },
    {
        button: contact,
        link: 'https://tarock.webflow.io/contact-us'
    }],
    [
    {
        button: logoutButton,
        func: 'logout'
    }]
]

export { profileOptions };