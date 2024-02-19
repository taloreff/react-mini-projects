export function AnimalList({ animalInfos }) {
  return (
    <div className="animals-container">
      <h2 className="component-title">Rare Animals</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Animal</th>
              <th>Count</th>
              <th>Photos</th>
            </tr>
          </thead>
          <tbody>
            {animalInfos.map((animal) => {
              return (
                <tr key={animal.type + animal.count}>
                  <td>{animal.type}</td>
                  <td>{animal.count}</td>
                  <td>
                    <a href={`https://www.google.com/search?q=${animal.type}`}>
                      Search
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
