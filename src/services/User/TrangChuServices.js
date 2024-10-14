import axiosInstance from '../index';

const TrangChuServices = {
    getListCategory: async () => {
        try {
            const response = await axiosInstance.get('/others/list_categories');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getListArticles: async (page) => {
        try {
            const response = await axiosInstance.get(`/others/list_articles?page=${page}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getTopTrending: async () => {
        try {
            const response = await axiosInstance.get('/others/top_trendings');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getMostPopular: async () => {
        try {
            const response = await axiosInstance.get('/others/most_popular');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getLastComment: async () => {
        try {
            const response = await axiosInstance.get('/others/last_comments');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getTopInteract: async () => {
        try {
            const response = await axiosInstance.get('/others/top_interacts');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getNewUser: async () => {
        try {
            const response = await axiosInstance.get('/others/new_users');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getTopCategories: async () => {
        try {
            const response = await axiosInstance.get('/others/top_categories');
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default TrangChuServices;
