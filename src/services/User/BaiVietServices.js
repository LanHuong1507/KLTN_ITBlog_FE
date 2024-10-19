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

    showArticle: async (slug) => {
        try {
            const response = await axiosInstance.get(`/articles/${slug}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy chi tiết bài viết
    detail: async (id) => {
        try {
            const response = await axiosInstance.get(`/articles/${id}/detail`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy danh sách bình luận
    listComment: async (id) => {
        try {
            const response = await axiosInstance.get(`/comments/${id}/article`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Thêm bình luận
    postComment: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/comments/${id}/article`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy danh sách bình luận
    getRelated: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/others/top_related/${id}`,data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default BaiVietServices;
