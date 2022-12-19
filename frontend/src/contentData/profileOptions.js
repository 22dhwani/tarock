import editInfo from '../assets/profile/editInfo.svg';
import modifyAvatar from '../assets/profile/modifyAvatar.svg';
import about from '../assets/profile/about.svg';
import contact from '../assets/profile/contact.svg';
import community from '../assets/profile/community.svg';
import logoutButton from '../assets/profile/logout.svg';

//link also serves as an on click function to be performed (condition: !includes('/'))
const profileOptions = [
    // [editInfo, modifyAvatar],
    // [about, contact, community],
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
    },
    {
        button: community,
        link: 'https://discord.com/invite/QzQQMgnPaf'
    }],
    [
    {
        button: logoutButton,
        func: 'logout'
    }]
]

export { profileOptions };