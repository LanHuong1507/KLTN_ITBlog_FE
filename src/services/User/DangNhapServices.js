import axiosInstance from '../index';

const DangNhapServices = {
    login: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default DangNhapServices;
