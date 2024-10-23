import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export const REELS_HISTORY_LIST_QUERY_KEY = `resultHistorsssyList`;

const reelsList = async () => {
    const { data }: AxiosResponse<any> = await fetcher({
        url: 'media.php',
        method: 'POST',
    });
    return data;
};

function useGetMediaListQuery() {
    return useQuery(REELS_HISTORY_LIST_QUERY_KEY, ()=>reelsList());
}

export default useGetMediaListQuery;
