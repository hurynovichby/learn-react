import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [
        { name: 'Andrey H.', salary: 1000, increase: true, like: false, id: 1 },
        { name: 'Ivan Y.', salary: 300, increase: false, like: true, id: 2 },
        { name: 'Alex M.', salary: 500, increase: false, like: false, id: 3 },
        { name: 'Helen G.', salary: 1500, increase: false, like: false, id: 4 },
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 5;
  }

  deleteItem = (id) => {
    this.setState(({ date }) => {
      return {
        date: date.filter(item => item.id !== id)
      }
    })
  }

  addUser = (name, salary) => {
    const newUser = {
      name,
      salary,
      increase: false,
      like: false,
      id: this.maxId++
    }

    this.setState(({ date }) => {
      const newArr = [...date, newUser];
      return {
        date: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({ date }) => ({
      date: date.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({ term: term });
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'like':
        return items.filter(item => item.like);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({ filter: filter });
  }

  render() {
    const { date, term, filter } = this.state;
    const employees = this.state.date.length;
    const increased = this.state.date.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(date, term), filter);

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          date={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />
        <EmployeesAddForm onAdd={this.addUser} />
      </div>
    );
  }
}

export default App;
