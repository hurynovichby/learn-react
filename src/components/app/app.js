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
      ]
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

  onToggleRise = (id) => {
    console.log(`Rise this ${id}`)
  }

  render() {
    const employees = this.state.date.length;
    const increased = this.state.date.filter(item => item.increase).length;
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          date={this.state.date}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />
        <EmployeesAddForm onAdd={this.addUser} />
      </div>
    );
  }
}

export default App;
