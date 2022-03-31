import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {

  const date = [
    { name: 'Andrey H.', salary: 1000, increase: true, id: 1 },
    { name: 'Ivan Y.', salary: 300, increase: false, id: 2 },
    { name: 'Alex M.', salary: 500, increase: false, id: 3 },
  ];

  return (
    <div className="app">
      <AppInfo />

      <div className="search-panel">
        <SearchPanel />
        <AppFilter />
      </div>

      <EmployeesList date={date} />
      <EmployeesAddForm />
    </div>
  );
}

export default App;
