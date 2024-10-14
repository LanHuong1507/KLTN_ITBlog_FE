import axiosInstance from '../index';

const TaiKhoanServices = {
    profile: async () => {
        try {
            const response = await axiosInstance.get('/users/profile');
            return response;
        } catch (error) {
            throw error;
        }
    },

    userByUsername: async (username) => {
        try {
            const response = await axiosInstance.get(`/users/${username}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default TaiKhoanServices;
