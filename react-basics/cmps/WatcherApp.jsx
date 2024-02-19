const { useState, useEffect } = React
import { WatcherCard } from './WatcherCard.jsx'
import { WatcherModal } from './WatcherModal.jsx'
import { watcherService } from '../services/watcher.service.js'

export function WatcherApp() {
    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        loadWatchers()
    }, [])

    async function loadWatchers() {
        const watchers = await watcherService.query()
        setWatchers(watchers)
    }

    function showWatcherForm() {
        const elAddWatcherForm = document.querySelector('.add-watcher-form');
        if (elAddWatcherForm.classList.contains('hidden')) {
            elAddWatcherForm.classList.remove('hidden')
        }
        else {
            elAddWatcherForm.classList.add('hidden')
        }
        onCloseModal()
    }

    async function onAddWatcher(ev) {
        ev.preventDefault()
        const elNameInput = document.getElementById('name-input')
        const elMoviesInput = document.getElementById('movies-input')
        const movies = elMoviesInput.value.split(',').map(movie => movie.trim()).filter(movie => movie !== "");
        if (!elNameInput.value) {
            alert('Please enter a name')
            return
        }
        let newWatcher = { fullname: elNameInput.value, movies }
        newWatcher = await watcherService.save(newWatcher)
        setWatchers(prevWatchers => [...prevWatchers, newWatcher])
        showWatcherForm()
        elNameInput.value = ""
        elMoviesInput.value = ""
    }

    async function onRemoveWatcher(watcherId) {
        await watcherService.remove(watcherId)
        setWatchers(prevWatchers => prevWatchers.filter(watcher => watcher.id !== watcherId))
        onCloseModal()
    }

    function onOpenModal(watcher) {
        const elAddWatcherForm = document.querySelector('.add-watcher-form')
        if (!elAddWatcherForm.classList.contains('hidden')) {
            elAddWatcherForm.classList.add('hidden')
        }
        const elModal = document.querySelector('.modal')
        elModal.classList.remove('hidden')
        elModal.classList.add('open')
        setSelectedWatcher(watcher)
    }

    function onCloseModal() {
        if (!document.querySelector('.modal').classList.contains('hidden'))
            document.querySelector('.modal').classList.add('hidden')
    }

    if (!watchers) return <div>Loading..</div>

    return (
        <div className="watcher-container">
            <div className="header-container">
                <h2 className="header-title">Watcher App</h2>
                <button className="add-watcher" onClick={showWatcherForm}>Add Watcher</button>
                <div className="add-watcher">
                    <form className="add-watcher-form hidden">
                        <label htmlFor="name-input">Name: </label>
                        <input id="name-input" type="text" required />
                        <label htmlFor="movies-input">Movies: </label>
                        <input id="movies-input" type="text" />
                        <button type="submit" onClick={(ev) => onAddWatcher(ev)}>Submit Watcher</button>
                    </form>
                </div>
            </div>
            <div className="modal hidden">
                <WatcherModal {...selectedWatcher} onCloseModal={onCloseModal} />
            </div>
            <div className="watchers-container">
                {watchers.length > 0 ?
                    watchers.map(watcher => {
                        return <WatcherCard
                            key={watcher.id}
                            {...watcher}
                            onRemoveWatcher={onRemoveWatcher}
                            onOpenModal={onOpenModal} />
                    }) :
                    <p className="empty-watchers">Create your first user! Happy watching...</p>
                }
            </div>
        </div>
    )
}
