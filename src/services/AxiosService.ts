import { http } from '@/http';
import { AxiosResponse } from 'axios';

export const handleAxiosError = (error: any) => {
    const errorMessage =
        error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
    if ((!error.response || error.response.status !== 401) && errorMessage) {
        return error;
    } else {
        return Promise.reject(error);
    }
};

export const pingServer = async (): Promise<AxiosResponse | undefined> => {
    try {
        const response = await http.get('/health/ping');
        return response.data;
    } catch (error) {
        return await handleAxiosError(error);
    }
};

export const getSearchSingleThread = async (search: string): Promise<AxiosResponse | undefined> => {
    try {
        const response = await http.get(`/search-single?search=${search}`);
        return response.data;
    } catch (error) {
        return await handleAxiosError(error);
    }
};

export const getSearchMultiThread = async (search: any): Promise<AxiosResponse | undefined> => {
    try {
        const response = await http.get(`/search-multi?search=${search.search}&maxWorkers=${search.maxWorkers}`);
        return response.data;
    } catch (error) {
        return await handleAxiosError(error);
    }
};

export const postAddToIndexSingle = async (data: any): Promise<AxiosResponse | undefined> => {
    try {
        const response = await http.post('/add-to-table-single', data);
        return response.data;
    } catch (error) {
        return await handleAxiosError(error);
    }
};

export const postAddToIndexMulti = async (data: any): Promise<AxiosResponse | undefined> => {
    try {
        const response = await http.post('/add-to-table-multi', data);
        return response.data;
    } catch (error) {
        return await handleAxiosError(error);
    }
};
