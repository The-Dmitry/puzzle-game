import { HttpMethod } from '../../models/enums/ApiMethod';
import { Endpoint } from '../../models/enums/Endpoint';
import { LoaderOption } from '../../models/types/LoaderOption';
import { Source } from '../../models/types/Source';

class Loader {
    private baseLink: string;

    private options: LoaderOption;

    constructor(baseLink: string, options: Readonly<LoaderOption>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: Endpoint; options?: Readonly<Source> },
        callback: (data: T) => void = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    public errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: Source, endpoint: Endpoint) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    public load<U>(
        method: keyof typeof HttpMethod,
        endpoint: Endpoint,
        callback: (data: U) => void,
        options: Source = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
