export function WatcherModal({ fullname, movies, onCloseModal }) {
    return (
        <div>
            <h3>{`${fullname}'s favorites:`}</h3>
            {movies && movies.length > 0 ? (
                <ul className="movies-list">
                    {movies.map(movie => (
                        <li key={movie}>{movie}</li>
                    ))}
                </ul>
            ) : (
                <p>No movies available</p>
            )}
            {/* <ul className="movies-list">
                {movies.map(movie => (
                    <li key={movie}>{movie}</li>
                ))}
            </ul> */}
            <button onClick={() => onCloseModal()}>Close</button>
        </div>
        // Q: without conditional rendering it didnt work, why?
    );
}
