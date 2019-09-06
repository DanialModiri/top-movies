

export default store => next => action => {
    if (typeof action === 'function') {
        action(store.dispatch, store.getState());
        return;
    }
    next(action);
}