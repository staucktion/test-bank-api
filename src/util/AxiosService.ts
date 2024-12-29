import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosService {
	private readonly config: AxiosRequestConfig;

	private constructor(config: AxiosRequestConfig) {
		this.config = {
			...config,
			headers: {
				"Content-Type": "application/json",
				...config.headers,
			},
		};
	}

	public static builder() {
		return new this.Builder();
	}

	public displayProperties(): void {
		console.log("Axios Config:", this.config);
	}

	public async request(): Promise<AxiosResponse> {
		return await axios.request(this.config);
	}

	// nested builder class
	private static Builder = class {
		private config: AxiosRequestConfig = {};

		public setUrl(url: string): this {
			this.config.url = url;
			return this;
		}

		public setMethod(method: string): this {
			this.config.method = method;
			return this;
		}

		public setData(data: object): this {
			this.config.data = data;
			return this;
		}

		public setHeaders(headers: object): this {
			this.config.headers = { ...this.config.headers, ...headers };
			return this;
		}

		public build(): AxiosService {
			return new AxiosService(this.config);
		}
	};
}

export default AxiosService;
