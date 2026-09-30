import React, { useState } from 'react'
import './index.css'

// ── Data ──────────────────────────────────────────────
const SERVICES = [
  { id: 1, icon: '✂️',  name: 'Corte Clásico',      duration: '30 min', price: '$150' },
  { id: 2, icon: '🧔',  name: 'Arreglo de Barba',   duration: '20 min', price: '$100' },
  { id: 3, icon: '💈',  name: 'Corte + Barba',       duration: '50 min', price: '$220' },
  { id: 4, icon: '👑',  name: 'Corte Premium',       duration: '45 min', price: '$200' },
  { id: 5, icon: '🧴',  name: 'Tratamiento Capilar', duration: '40 min', price: '$180' },
  { id: 6, icon: '🪒',  name: 'Rasurado Clásico',   duration: '25 min', price: '$120' },
]

const BARBERS = [
  { id: 1, name: 'Carlos', initials: 'CA' },
  { id: 2, name: 'Miguel', initials: 'MR' },
  { id: 3, name: 'Luis',   initials: 'LD' },
]

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '13:00', '13:30', '14:00', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
]

const TAKEN_SLOTS = ['10:00', '11:30', '14:00', '16:30']

// ── Today as min date ─────────────────────────────────
const todayStr = new Date().toISOString().split('T')[0]

// ── App ───────────────────────────────────────────────
export default function App() {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedBarber,  setSelectedBarber]  = useState(null)
  const [selectedSlot,    setSelectedSlot]    = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', date: '', note: '' })
  const [confirmed, setConfirmed] = useState(false)

  const handleInput = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const canSubmit = selectedService && selectedBarber && selectedSlot && form.name && form.phone && form.date

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setConfirmed(true)
  }

  function reset() {
    setSelectedService(null)
    setSelectedBarber(null)
    setSelectedSlot(null)
    setForm({ name: '', phone: '', date: '', note: '' })
    setConfirmed(false)
  }

  return (
    <>
      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-bg" />
        <span className="hero-scissors">✂️</span>
        <h1>BarberElite<br/>Studio</h1>
        <p>Reserva tu cita en segundos. Estilo premium, atención de primer nivel.</p>
        <a href="#reservar" className="hero-cta">Reservar ahora →</a>
      </header>

      {/* ── Services ── */}
      <section>
        <p className="section-label">Nuestros servicios</p>
        <h2 className="section-title">Elige tu experiencia</h2>
        <div className="divider" />
        <div className="services-grid">
          {SERVICES.map(s => (
            <div
              key={s.id}
              className={`service-card${selectedService?.id === s.id ? ' selected' : ''}`}
              onClick={() => { setSelectedService(s); document.getElementById('reservar').scrollIntoView({ behavior: 'smooth' }) }}
            >
              <span className="service-icon">{s.icon}</span>
              <div className="service-name">{s.name}</div>
              <div className="service-duration">⏱ {s.duration}</div>
              <div className="service-price">{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking ── */}
      <section id="reservar">
        <p className="section-label">Reserva tu cita</p>
        <h2 className="section-title">Agenda tu visita</h2>
        <div className="divider" />

        <div className="booking-card">
          <form onSubmit={handleSubmit}>

            {/* Servicio seleccionado */}
            {selectedService && (
              <div className="form-group" style={{ marginBottom: 28 }}>
                <label>Servicio seleccionado</label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--bg-elevated)', border: '1px solid var(--gold)',
                  borderRadius: 10, padding: '12px 16px'
                }}>
                  <span style={{ fontSize: '1.4rem' }}>{selectedService.icon}</span>
                  <span style={{ fontWeight: 700 }}>{selectedService.name}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--gold-light)', fontWeight: 800 }}>{selectedService.price}</span>
                </div>
              </div>
            )}

            {/* Barbero */}
            <div className="form-group">
              <label>Elige tu barbero</label>
              <div className="barbers-row">
                {BARBERS.map(b => (
                  <div
                    key={b.id}
                    className={`barber-chip${selectedBarber?.id === b.id ? ' active' : ''}`}
                    onClick={() => setSelectedBarber(b)}
                  >
                    <div className="barber-avatar">{b.initials}</div>
                    <span className="barber-name">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row">
              {/* Nombre */}
              <div className="form-group">
                <label htmlFor="name">Tu nombre</label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Juan García"
                  value={form.name} onChange={handleInput}
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone" name="phone" type="tel"
                  placeholder="+52 555 123 4567"
                  value={form.phone} onChange={handleInput}
                  required
                />
              </div>
            </div>

            {/* Fecha */}
            <div className="form-group">
              <label htmlFor="date">Fecha de la cita</label>
              <input
                id="date" name="date" type="date"
                min={todayStr}
                value={form.date} onChange={handleInput}
                required
              />
            </div>

            {/* Horario */}
            <div className="form-group">
              <label>Selecciona el horario</label>
              <div className="time-slots">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot${TAKEN_SLOTS.includes(slot) ? ' taken' : ''}${selectedSlot === slot ? ' active' : ''}`}
                    onClick={() => !TAKEN_SLOTS.includes(slot) && setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Nota */}
            <div className="form-group">
              <label htmlFor="note">Nota adicional (opcional)</label>
              <textarea
                id="note" name="note"
                placeholder="Ej: quiero el corte fade con línea..."
                value={form.note} onChange={handleInput}
              />
            </div>

            <button className="btn-submit" type="submit" disabled={!canSubmit}>
              Confirmar reserva ✂️
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <p>© 2026 <span>BarberElite Studio</span> — Todos los derechos reservados</p>
        <p style={{ marginTop: 6 }}>📍 Av. Principal 123, Ciudad · 📞 +52 555 000 1111</p>
      </footer>

      {/* ── Confirmation modal ── */}
      {confirmed && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && reset()}>
          <div className="confirm-box">
            <span className="confirm-icon">🎉</span>
            <h2>¡Cita confirmada!</h2>
            <p>Tu reserva ha sido agendada con éxito.</p>
            <div className="confirm-detail">
              <p>✂️ <strong>Servicio:</strong> {selectedService?.name}</p>
              <p>👤 <strong>Barbero:</strong> {selectedBarber?.name}</p>
              <p>📅 <strong>Fecha:</strong> {form.date}</p>
              <p>⏰ <strong>Hora:</strong> {selectedSlot}</p>
              <p>🙍 <strong>Cliente:</strong> {form.name}</p>
              {form.note && <p>📝 <strong>Nota:</strong> {form.note}</p>}
            </div>
            <p style={{ fontSize: '0.85rem' }}>Te llamaremos al {form.phone} para confirmar.</p>
            <button className="btn-close" onClick={reset}>Nueva reserva</button>
          </div>
        </div>
      )}
    </>
  )
}
