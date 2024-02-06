import { HttpMethod } from '../../models/enums/HttpMethod';
import ArticleResponse from '../../models/interfaces/ArticleResponse';
import { LoaderOption } from '../../models/types/LoaderOption';
import { ResponseOption } from '../../models/types/ResponseOption';

class Loader {
    private baseLink: string;

    private options: LoaderOption;

    constructor(baseLink: string, options: LoaderOption) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: ResponseOption },
        callback: (data: ArticleResponse) => void | (() => void) = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: ResponseOption, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: keyof typeof HttpMethod,
        endpoint: string,
        callback: (data: ArticleResponse) => void | (() => void),
        options: ResponseOption = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
