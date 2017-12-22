
import router from './router/index';

export default {
    user: {
        authenticated: false,
    },

    logout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.user.authenticated = false;
        router.go('/');
    },

    checkAuth() {
        const jwt = localStorage.getItem('token');

        if (jwt) {
            this.user.authenticated = true;
        } else {
            this.user.authenticated = false;
        }
    },

    getAuthHeader() {
        return {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };
    },
};
