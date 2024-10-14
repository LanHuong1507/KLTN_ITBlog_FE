import axiosInstance from '../index';

const BaiVietServices = {
    listArticles: async (page) => {
        try {
            const response = await axiosInstance.get(`/articles/?page=${page}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default BaiVietServices;
