import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//#region ----- Images ----
import logo from '../assets/logo.svg'
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'
// #endregion
import api from '../services/api'
import './Main.css'
const Main = ({ match }) => {
  const { id } = match.params
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const { data } = await api.get('/devs', {
        headers: { user: id }
      })
      setUsers(data)
    }
    loadUsers()
  }, [id])

  const handleLike = async targetId => {
    await api.post(`/devs/${targetId}/likes`, null, {
      headers: { user: id }
    })
    setUsers(users.filter(user => user._id !== targetId))
  }
  const handleDislike = async targetId => {
    await api.post(`/devs/${targetId}/dislikes`, null, {
      headers: { user: id }
    })
    setUsers(users.filter(user => user._id !== targetId))
  }
  return (
    <div className={'main-container'}>
      <Link to='/'>
        <img src={logo} alt='Tindev' />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt='' />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className={'buttons'}>
                <button type='button' onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt='dislike' />
                </button>
                <button type='button' onClick={() => handleLike(user._id)}>
                  <img src={like} alt='like' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={'empty'}>Acabou :(</p>
      )}
    </div>
  )
}

export default Main
