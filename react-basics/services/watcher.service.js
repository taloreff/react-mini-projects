import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const WATCHERS_KEY = 'WatcherDB'
_createWatchers()

export const watcherService = {
    query,
    get,
    remove,
    save,
    getEmptyWatcher,
    getNextWatcherId,
}

function query() {
    return storageService.query(WATCHERS_KEY)
}

function get(watcherId) {
    return storageService.get(WATCHERS_KEY, watcherId)
}

function remove(watcherId) {
    return storageService.remove(WATCHERS_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(WATCHERS_KEY, watcher)
    } else {
        return storageService.post(WATCHERS_KEY, watcher)
    }
}

function getNextWatcherId(watcherId) {
    return storageService.query(WATCHERS_KEY)
        .then(watchers => {
            var idx = watchers.findIndex(watcher => watcher.id === watcherId)
            if (idx === watchers.length - 1) idx = -1
            return watchers[idx + 1].id
        })
}

function getEmptyWatcher(fullname = '', movies = []) {
    return { id: '', fullname, movies }
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(WATCHERS_KEY)
    if (!watchers || !watchers.length) {
        watchers = []
        watchers.push(_createWatcher('Puki Ba', ['Rambo', 'Rocky']))
        watchers.push(_createWatcher('Muki Da', ['The Lion King', 'Bambi']))
        watchers.push(_createWatcher('Shuki Sa', ['Gladiator', '300: Rise of an Empire', 'Troy']))
        utilService.saveToStorage(WATCHERS_KEY, watchers)
    }
}

function _createWatcher(fullname, movies) {
    const watcher = getEmptyWatcher(fullname, movies)
    watcher.id = utilService.makeId()
    watcher.imageIndex = utilService.makeImage()
    return watcher
}


