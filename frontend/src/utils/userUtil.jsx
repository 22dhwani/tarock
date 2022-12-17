import maleAvatar from '../assets/avatarMale.svg';
import femaleAvatar from '../assets/avatarFemale.svg';
import biAvatar from '../assets/avatarBi.svg';
import yellowPattern from '../assets/patterns/yellow.png'
import tealPattern from '../assets/patterns/teal.svg'
import bluePattern from '../assets/patterns/blue.svg'
import violetPattern from '../assets/patterns/violet.svg'

const getUser = async (id, userType) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${id}?userType=${userType}`);
    const data = await response.json();
    if (data.length > 0) {
        return data[0];
    }
};

const getAuthorization = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login/success`, { credentials: 'include' });
    return await response.json();
}

const getUserType = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/status/${id}`)
    const data = await response.json();
    return data;
}

const initUser = async (id, setUserData) => {
    const typeData = await getUserType(id);

    setUserData((prevUserData) => ({
        ...prevUserData,
        type: typeData.userType,
        id: id
    }));
    const authorization = await getAuthorization();
    if (authorization.success) { // Real user with cookie
        const authorizedUserData = await getUser(authorization.user.id, typeData.userType);
        setUserData((prevUserData) => ({
            ...prevUserData,
            name: authorizedUserData.name,
            gender: authorizedUserData.gender,
            avatarIndex: authorizedUserData.avatar_index,
            email: authorizedUserData.email,
            dob: authorizedUserData.birth_date,
            id: authorizedUserData.internal_user_id,
            isAuthorized: true
        }));
    } else if (typeData.userType === 'TMP') { // Get temp user data.
        const tmpUserData = await getUser(id, typeData.userType);
        setUserData((prevUserData) => ({
            ...prevUserData,
            name: tmpUserData.name,
            gender: tmpUserData.gender,
            avatarIndex: tmpUserData.avatar_index
        }));
    }
};

const logout = async (visitorId, setUserData) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/logout`, { credentials: 'include', method: 'POST' });
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const tmpUserData = await getUser(visitorId, 'TMP');
    setUserData((prevUserData) => ({
        ...prevUserData,
        name: tmpUserData ? tmpUserData.name : '',
        gender: tmpUserData ? tmpUserData.gender : '',
        avatarIndex: tmpUserData ? tmpUserData.avatar_index : 2,
        id: prevUserData.visitorId,
        email: '',
        dob: '',
        isAuthorized: false,
        type : tmpUserData ? 'REAL' : 'NEW'
    }));
};

const getAvatar = (avatarIndex) => {
    const list = [femaleAvatar, maleAvatar, biAvatar];
    if (avatarIndex >= 0 && avatarIndex < list.length) {
        return list[avatarIndex];
    }
    return biAvatar;
}

const getCardPattern = (quadra) => {
    const list = [bluePattern, yellowPattern, tealPattern, violetPattern];
    if (quadra === 'Alpha') {
        return list[0];
    } else if (quadra === 'Beta') {
        return list[1];
    } else if (quadra === 'Gamma') {
        return list[2];
    } else if (quadra === 'Delta') {
        return list[3];
    }
    return list[0];
}


export { getUser, getAuthorization, getUserType, logout, getAvatar, getCardPattern };