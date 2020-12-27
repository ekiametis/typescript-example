import { HttpStatusCode } from "../../enums/http-status-code";


export interface IHttpException {

    httpStatusCode: HttpStatusCode;
    errorCode: number;
    errorMessage: string;
    detailCode?: number;
    detailMessage?: string;
}

export class HttpException {

    private constructor(private data: IHttpException) {}

    static build(
        httpStatusCode: HttpStatusCode,
        errorCode: number,
        errorMessage: string,
    ): HttpException {
        const data = { httpStatusCode, errorCode, errorMessage }
        return new HttpException(data);
    }

    static buildWithDetail(
        httpStatusCode: HttpStatusCode,
        errorCode: number,
        errorMessage: string,
        detailCode: number,
        detailMessage: string,
    ): HttpException {
        const data = { httpStatusCode, errorCode, errorMessage, detailCode, detailMessage }
        return new HttpException(data);
    }

    retrieveHttpStatusCode(): number {
        return this.data.httpStatusCode;
    }

    retrieveErrorCode(): number {
        return this.data.errorCode;
    }

    retrieveErrorMessage(): string {
        return this.data.errorMessage;
    }

    retrieveDetailCode(): number {
        return this.data.detailCode;
    }

    retrieveDetailMessage(): string {
        return this.data.detailMessage;
    }

    formatToJSON(): IHttpException {
        return { ...this.data }
    }
}