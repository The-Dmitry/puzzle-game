import NewsSource from './NewsSource';

export default interface NewsSourceResponse {
    status: string;
    sources: NewsSource[];
}
