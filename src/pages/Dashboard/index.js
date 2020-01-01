import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './styles.css';

export default function Dashborad() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const userid = localStorage.getItem('user');
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: { userid }
      }),
    [userid]
  );

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const userid = localStorage.getItem('user');
      const result = await api.get('/dashboard', {
        headers: { userid }
      });
      setSpots(result.data);
    }
    loadSpots();
  }, []); // array vazio vai ser axec apenas uma unica vez

  async function handleAccept(id) {
    await api.post(`/booking/${id}/approvel`);
    setRequests(requests.filter(request => request.id !== id));
  }

  async function handleReject(id) {
    await api.post(`/booking/${id}/rejection`);
    setRequests(requests.filter(request => request.id !== id));
  }

  return (
    <>
      <ul className='notifications'>
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em
              <strong>{request.spot.company}</strong> para o dia: <strong>{request.data}</strong>
            </p>
            <button className='accept' onClick={() => handleAccept(requests._id)}>
              Aceitar
            </button>
            <button className='reject' onClick={() => handleReject(requests._id)}>
              Rejeitar
            </button>
          </li>
        ))}
      </ul>
      <ul className='spot-list'>
        {spots.map(spots => (
          <li key={spots._id}>
            <header style={{ backgroundImage: `url(${spots.thumbnail_url})` }} />
            {console.log(spots.thumbnail_url)}
            <strong>{spots.company}</strong>
            <span>{spots.price ? `RR${spots.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>
      <Link to='/new'>
        <button className='btn'>Novo Spot</button>
      </Link>
    </>
  );
}
