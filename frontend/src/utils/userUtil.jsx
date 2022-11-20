const getUser = async (id, userType) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${id}?userType=${userType}`);
    const data = await response.json();
    if (data.length > 0) {
        return data[0];
    }
};

const getAuthorization = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login/success`, {credentials: 'include'});
    return await response.json();
}

export { getUser, getAuthorization };