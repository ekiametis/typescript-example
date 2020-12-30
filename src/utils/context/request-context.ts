import asyncHooks, { AsyncHook, HookCallbacks } from 'async_hooks';
import { v4 as uuid } from 'uuid';
import { IContext } from '../../components/context/context';
const store = new Map<Number, IContext>();

const hook: HookCallbacks = {
    init: (asyncId, type, triggerAsyncId, resource) => {
        if (store.has(Number(triggerAsyncId))) {
            store.set(Number(asyncId), store.get(triggerAsyncId))
        }
    },
    destroy: (asyncId) => {
        if (store.has(Number(asyncId))) {
            store.delete(Number(asyncId));
        }
    }
}

const asyncHook: AsyncHook = asyncHooks.createHook(hook);
asyncHook.enable();

export const createRequestContext = (data, correlationId = uuid()): IContext => {
    const requestInfo: IContext = { correlationId, data };
    store.set(Number(asyncHooks.executionAsyncId()), requestInfo);
    return requestInfo;
};

export const getRequestContext = (): IContext => {
    return store.get(Number(asyncHooks.executionAsyncId()));
};

export default { createRequestContext, getRequestContext };