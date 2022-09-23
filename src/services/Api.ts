import Axios from 'axios';
import {IEntry} from '../domain/IEntry';
import { IFetchResponse } from '../domain/IFetchResponse';


export abstract class Api {
    private static axios = Axios.create(
        {
            baseURL: "http://localhost:8080/",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    static async get(id: string): Promise<IFetchResponse<Object>> {
        const url = "" + id;
        try {
            const response = await this.axios.get<Object>(url);
            console.log('get response', response);
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }

    static async create(input: IEntry): Promise<IFetchResponse<IEntry>> {
        const url = "";
        try {
            const response = await this.axios.post<IEntry>(url, JSON.stringify(input), { headers: { "Content-Type": "application/json" } })
            if (response.status >= 200 && response.status < 300) {
                console.log('response', response);
                return {
                    statusCode: response.status,
                    data: response.data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }
}
