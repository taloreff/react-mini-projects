export function WatcherCard({ id, fullname, movies, imageIndex, onRemoveWatcher, onOpenModal }) {
    return <div className="watcher-card">
        <img src={`./assets/img/boy${imageIndex}.jpeg`} alt="Watcher Image" />
        <p>{fullname}</p>
        <hr />
        <div className="buttons-container">
            <button onClick={() => onRemoveWatcher(id)}>X</button>
            <button onClick={() => onOpenModal({ id, fullname, movies })}>Select</button>
        </div>
    </div>
}