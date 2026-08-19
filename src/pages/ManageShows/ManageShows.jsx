import { useEffect, useState } from 'react'
import { getShows, createShow, updateShow, deleteShow } from '../../api/api'
import ShowForm from '../../components/ShowForm/ShowForm'
import './ManageShows.css'

function ManageShows() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingShow, setEditingShow] = useState(null)
  const [deleting, setDeleting] = useState(null)

  async function loadShows() {
    setLoading(true)
    setError('')

    try {
      const data = await getShows()
      setShows(data)
    } catch {
      setError('Failed to load shows.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadShows()
  }, [])

  function handleAdd() {
    setEditingShow(null)
    setFormOpen(true)
  }

  function handleEdit(show) {
    setEditingShow(show)
    setFormOpen(true)
  }

  function handleCancel() {
    setFormOpen(false)
    setEditingShow(null)
  }

  async function handleSubmit(payload) {
    if (editingShow) {
      await updateShow(editingShow.id, payload)
    } else {
      await createShow(payload)
    }

    setFormOpen(false)
    setEditingShow(null)
    await loadShows()
  }

  async function handleDelete(show) {
    if (!window.confirm(`Delete "${show.name}"? This cannot be undone.`)) {
      return
    }

    setDeleting(show.id)

    try {
      await deleteShow(show.id)
      await loadShows()
    } catch {
      alert('Failed to delete show.')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <main className="manage">
      <div className="manage-header">
        <div>
          <h1>Manage Shows</h1>
          <p className="manage-subtitle">
            {shows.length} show{shows.length !== 1 ? 's' : ''} in database
          </p>
        </div>
        <button className="manage-add-btn" onClick={handleAdd}>
          + Add Show
        </button>
      </div>

      {loading && <p className="manage-message">Loading shows...</p>}

      {!loading && error && (
        <p className="manage-message manage-error">{error}</p>
      )}

      {!loading && !error && shows.length === 0 && (
        <div className="manage-empty">
          <p>No shows yet. Add your first show!</p>
        </div>
      )}

      {!loading && !error && shows.length > 0 && (
        <div className="manage-table-wrap">
          <table className="manage-table">
            <thead>
              <tr>
                <th className="manage-th-image">Poster</th>
                <th className="manage-th-name">Name</th>
                <th className="manage-th-genres">Genres</th>
                <th className="manage-th-rating">Rating</th>
                <th className="manage-th-status">Status</th>
                <th className="manage-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show.id} className="manage-row">
                  <td className="manage-cell-image">
                    {show.image?.medium ? (
                      <img
                        className="manage-thumb"
                        src={show.image.medium}
                        alt={show.name}
                      />
                    ) : (
                      <div className="manage-thumb-placeholder">N/A</div>
                    )}
                  </td>
                  <td className="manage-cell-name">{show.name}</td>
                  <td className="manage-cell-genres">
                    {show.genres?.join(', ') || '—'}
                  </td>
                  <td className="manage-cell-rating">
                    {show.rating?.average || '—'}
                  </td>
                  <td className="manage-cell-status">
                    <span
                      className={`manage-badge ${
                        show.status === 'Running' ? 'badge-running' : 'badge-ended'
                      }`}
                    >
                      {show.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="manage-cell-actions">
                    <button
                      className="manage-action manage-edit"
                      onClick={() => handleEdit(show)}
                    >
                      Edit
                    </button>
                    <button
                      className="manage-action manage-delete"
                      onClick={() => handleDelete(show)}
                      disabled={deleting === show.id}
                    >
                      {deleting === show.id ? '...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <ShowForm
          show={editingShow}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </main>
  )
}

export default ManageShows
