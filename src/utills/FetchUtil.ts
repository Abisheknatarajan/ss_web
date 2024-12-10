import { CSV_HEADERS, JSON_HEADERS, PDF_HEADERS } from "../apiInterface"

export const getJsonPostRequestInit = (controller?: AbortController, body?: BodyInit): RequestInit => {
    return {
        method: 'POST',
        headers: JSON_HEADERS,
        cache: 'no-store',
        signal: controller?.signal,
        body: body,
    }
}
export const getCsvPostRequestInit = (controller?: AbortController, body?: BodyInit): RequestInit => {
    return {
        method: 'POST',
        headers: CSV_HEADERS,
        cache: 'no-store',
        signal: controller?.signal,
        body: body,
    }
}
export const getPdfPostRequestInit = (controller?: AbortController, body?: BodyInit): RequestInit => {
    return {
        method: 'POST',
        headers: PDF_HEADERS,
        cache: 'no-store',
        signal: controller?.signal,
        body: body,
    }
}
