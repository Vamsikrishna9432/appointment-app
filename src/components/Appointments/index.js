// Write your code here

import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {name: '', date: '', appointmentList: [], starred: false}

  onchangeName = event => {
    this.setState({name: event.target.value})
  }

  onchangeDate = event => {
    this.setState({date: event.target.value})
  }

  onchangestarredstatus = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  updateIsFavorite = id => {
    const {appointmentList} = this.state
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {name, date, appointmentList} = this.state
    const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      name,
      date: newDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      name: '',
      date: '',
    }))
  }

  render() {
    const {appointmentList, name, date, starred} = this.state
    let filteredResults = appointmentList
    if (starred) {
      filteredResults = appointmentList.filter(each => each.isFavorite === true)
    }

    const classname = starred ? 'active-star-button' : 'star-button'

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-container">
            <div className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.addAppointment}>
                <div className="title-container">
                  <label className="label-text" htmlFor="title">
                    TITLE
                  </label>
                  <input
                    id="title"
                    className="box"
                    value={name}
                    onChange={this.onchangeName}
                    placeholder="Title"
                  />
                </div>
                <div className="title-container">
                  <label className="label-text" htmlFor="Date">
                    DATE
                  </label>
                  <input
                    id="Date"
                    className="box"
                    type="date"
                    value={date}
                    onChange={this.onchangeDate}
                  />
                </div>
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="seperator" />
          <div className="bottom-container">
            <div className="bottom-heading">
              <h1 className="head">Appointments</h1>
              <button
                className={classname}
                onClick={this.onchangestarredstatus}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-container">
              {filteredResults.map(each => (
                <AppointmentItem
                  each={each}
                  updateIsFavorite={this.updateIsFavorite}
                  key={each.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
