import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const EVENT_IAMGE_LIST_QUERY_KEY =(id:string)=> `eventImageListsssyList${id}`;

const eventImage = async (id:string) => {
    const { data }: AxiosResponse<any> = await fetcher({
        url:`events_images.php?id=${id}`,
        method: 'POST',
    });
    return data;
};

function useGetEventListQuery(id:string) {
    return useQuery(EVENT_IAMGE_LIST_QUERY_KEY(id), ()=>eventImage(id));
}

export default useGetEventListQuery;
