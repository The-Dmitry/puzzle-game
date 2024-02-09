import NewsSource from '../interfaces/NewsSource';

export type Source = Readonly<Partial<{ sources: NewsSource['id'] }>>;
