// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {each, updateIsFavorite} = props
  const {id, name, date, isFavorite} = each

  const onUpdateIs = () => {
    updateIsFavorite(id)
  }

  const links = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="name">
      <div className="top">
        <h1 className="na">{name}</h1>
        <button className="fav" onClick={onUpdateIs} testid="star">
          <img className="star" alt="star" src={links} />
        </button>
      </div>
      <p className="da">{date}</p>
    </li>
  )
}

export default AppointmentItem
