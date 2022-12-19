import maleAvatar from '../assets/avatarMale.svg';
import femaleAvatar from '../assets/avatarFemale.svg';
import biAvatar from '../assets/avatarBi.svg';
import yellowPattern from '../assets/patterns/yellow.png'
import tealPattern from '../assets/patterns/teal.svg'
import bluePattern from '../assets/patterns/blue.svg'
import violetPattern from '../assets/patterns/violet.svg'

// Chart Images
import ChartDataAnalyst from "../assets/chart/data/Analyst.png"
import ChartDataArtist from "../assets/chart/data/Artist.png"
import ChartDataChallenger from "../assets/chart/data/Challenger.png"
import ChartDataCounsel from "../assets/chart/data/Counsel.png"
import ChartDataCrafter from "../assets/chart/data/Crafter.png"
import ChartDataEnthusiast from "../assets/chart/data/Enthusiast.png"
import ChartDataForeseer from "../assets/chart/data/Foreseer.png"
import ChartDataInspector from "../assets/chart/data/Inspector.png"
import ChartDataJournalist from "../assets/chart/data/Journalist.png"
import ChartDataMediator from "../assets/chart/data/Mediator.png"
import ChartDataOrganizer from "../assets/chart/data/Organizer.png"
import ChartDataPerformer from "../assets/chart/data/Performer.png"
import ChartDataPersuader from "../assets/chart/data/Persuader.png"
import ChartDataProtector from "../assets/chart/data/Protector.png"
import ChartDataTenacious from "../assets/chart/data/Tenacious.png"
import ChartDataVisionary from "../assets/chart/data/Visionary.png"

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

function getUserMatchLinearColorFromQuadra(userQuadra, matchedQuadra) {
    return getLinearColorFromColorNames(getUserColorNameFromQuadra(userQuadra),getUserColorNameFromQuadra(matchedQuadra))
}

function getUserColorNameFromQuadra(quadra) {
    if (quadra === 'Alpha') {
        return 'blue';
    } else if (quadra === 'Beta') {
        return 'yellow';
    } else if (quadra === 'Gamma') {
        return 'teal';
    } else if (quadra === 'Delta') {
        return 'purple';
    }
}

function getLinearColorFromColorNames(startColor, endColor) {
    if (startColor === "blue" && endColor === "blue") return "linear-gradient(180deg, #2C61AD 0%, #47A4B0 49.48%, #2C61AD 100%)";
    if (startColor === "blue" && endColor === "yellow") return "linear-gradient(180deg, #3069B3 0%, #C0B17B 67.71%, #F8D045 100%)";
    if (startColor === "blue" && endColor === "teal") return "linear-gradient(180deg, #2C61AD 0%, #59BBB2 100%)";
    if (startColor === "blue" && endColor === "purple") return "linear-gradient(180deg, #2C61AD 0%, #5E6AA9 40.1%, #B561D6 100%)";

    if (startColor === "yellow" && endColor === "blue") return "linear-gradient(180deg, #F8D045 0%, #C0B17B 23.96%, #3069B3 100%)";
    if (startColor === "yellow" && endColor === "yellow") return "linear-gradient(180deg, #E9B53D 0%, #D68B61 49.48%, #E9B53D 100%)";
    if (startColor === "yellow" && endColor === "teal") return "linear-gradient(180deg, #F8D045 0%, #AFBE74 23.96%, #61C3BB 100%)";
    if (startColor === "yellow" && endColor === "purple") return "linear-gradient(180deg, #F8D045 0%, #BEA074 31.25%, #B561D6 100%)";

    if (startColor === "teal" && endColor === "blue") return "linear-gradient(180deg, #59BBB2 0%, #2C61AD 100%)";
    if (startColor === "teal" && endColor === "yellow") return "linear-gradient(180deg, #61C3BB 0%, #AFBE74 63.54%, #F8D045 100%)";
    if (startColor === "teal" && endColor === "teal") return "linear-gradient(180deg, #59BBB2 0%, #4C98C4 52.08%, #59BBB2 100%)";
    if (startColor === "teal" && endColor === "purple") return "linear-gradient(180deg, #61C2BA 0%, #5EA99B 32.29%, #B561D6 100%)";

    if (startColor === "purple" && endColor === "blue") return "linear-gradient(180deg, #B561D6 0%, #5E6AA9 64.58%, #2C61AD 100%)";
    if (startColor === "purple" && endColor === "yellow") return "linear-gradient(180deg, #B561D6 0%, #BEA074 63.54%, #F8D045 100%)";
    if (startColor === "purple" && endColor === "teal") return "linear-gradient(180deg, #B561D6 0%, #5EA99B 63.54%, #61C2BA 100%)";
    if (startColor === "purple" && endColor === "purple") return "linear-gradient(180deg, #BB6BD9 0%, #8F4CC4 52.08%, #BB6BD9 100%)";
}

export function getUserMatchChartImageData(personality) {
    return userChartDataImages[personality]
}

const userChartDataImages = {
    Analyst: ChartDataAnalyst,
    Artist: ChartDataArtist,
    Challenger: ChartDataChallenger,
    Counsel: ChartDataCounsel,
    Crafter: ChartDataCrafter,
    Enthusiast: ChartDataEnthusiast,
    Foreseer: ChartDataForeseer,
    Inspector: ChartDataInspector,
    Journalist: ChartDataJournalist,
    Mediator: ChartDataMediator,
    Organizer: ChartDataOrganizer,
    Performer: ChartDataPerformer,
    Persuader: ChartDataPersuader,
    Protector: ChartDataProtector,
    Tenacious: ChartDataTenacious,
    Visionary: ChartDataVisionary,
}


export { getUser, getAuthorization, getUserType, logout, getAvatar, getCardPattern, getUserMatchLinearColorFromQuadra };