
import editInfo from '../assets/editInfo.svg'
import modifyAvatar from '../assets/modifyAvatar.svg'
import articles from '../assets/articles.svg'
import community from '../assets/community.svg'
import privacy from '../assets/privacy.svg'
import about from '../assets/about.svg'
import contact from '../assets/contact.svg'

const profileOptions = [
    // [editInfo, modifyAvatar],
    // [articles,contact],
    // [articles, community],
    // [privacy, about, contact]
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
    // {
    //     button: articles,
    //     link: '/articles'
    // },
    {
        button: about,
        link: 'https://tarock.webflow.io/about-us'
    },
    {
        button: contact,
        link: 'https://tarock.webflow.io/contact-us'
    }],
]

export {profileOptions};