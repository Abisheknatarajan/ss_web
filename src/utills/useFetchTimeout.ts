import { AJAX_TIMEOUT } from "../apiinterface";

export const useFetchTimeout = (): [controller: AbortController, timer: () => number] => {
    const controller = new AbortController();
    console.log(controller)
    const timer = (): number => {
        return window.setTimeout(() => {
            controller.abort();
        }, AJAX_TIMEOUT);
    }
    return [controller, timer];
}