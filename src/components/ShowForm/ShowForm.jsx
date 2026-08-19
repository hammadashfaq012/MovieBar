import { useState, useEffect } from 'react'
import './ShowForm.css'

const emptyForm = {
  name: '',
  summary: '',
  imageMedium: '',
  imageOriginal: '',
  genres: '',
  rating: '',
  language: '',
  status: 'Running',
  runtime: '',
  officialSite: '',
}

function ShowForm({ show, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (show) {
      setForm({
        name: show.name || '',
        summary: show.summary ? show.summary.replace(/<[^>]*>/g, '') : '',
        imageMedium: show.image?.medium || '',
        imageOriginal: show.image?.original || '',
        genres: show.genres ? show.genres.join(', ') : '',
        rating: show.rating?.average?.toString() || '',
        language: show.language || '',
        status: show.status || 'Running',
        runtime: show.runtime?.toString() || '',
        officialSite: show.officialSite || '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [show])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (form.name.trim() === '') {
      setError('Show name is required.')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      name: form.name.trim(),
      summary: form.summary.trim(),
      image: {
        medium: form.imageMedium.trim(),
        original: form.imageOriginal.trim(),
      },
      genres: form.genres
        ? form.genres.split(',').map((g) => g.trim()).filter(Boolean)
        : [],
      rating: { average: parseFloat(form.rating) || 0 },
      language: form.language.trim(),
      status: form.status,
      runtime: form.runtime ? Number(form.runtime) : null,
      officialSite: form.officialSite.trim(),
    }

    try {
      await onSubmit(payload)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">
          {show ? 'Edit Show' : 'Add New Show'}
        </h2>

        {error && <p className="form-error">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">
              Show Name *
              <input
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Breaking Bad"
              />
            </label>
          </div>

          <div className="form-row form-row-2">
            <label className="form-label">
              Rating (0-10)
              <input
                className="form-input"
                type="number"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                placeholder="e.g. 9.5"
              />
            </label>
            <label className="form-label">
              Language
              <input
                className="form-input"
                type="text"
                name="language"
                value={form.language}
                onChange={handleChange}
                placeholder="e.g. English"
              />
            </label>
          </div>

          <div className="form-row form-row-2">
            <label className="form-label">
              Status
              <select
                className="form-input"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Running">Running</option>
                <option value="Ended">Ended</option>
                <option value="In Development">In Development</option>
              </select>
            </label>
            <label className="form-label">
              Runtime (min)
              <input
                className="form-input"
                type="number"
                name="runtime"
                min="0"
                value={form.runtime}
                onChange={handleChange}
                placeholder="e.g. 60"
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Genres (comma separated)
              <input
                className="form-input"
                type="text"
                name="genres"
                value={form.genres}
                onChange={handleChange}
                placeholder="e.g. Drama, Crime, Thriller"
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Poster (medium)
              <input
                className="form-input"
                type="url"
                name="imageMedium"
                value={form.imageMedium}
                onChange={handleChange}
                placeholder="Paste image URL..."
              />
            </label>
            <span className="form-or">or</span>
            <label className="form-label form-file-label">
              Upload from device
              <input
                className="form-file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => setForm((prev) => ({ ...prev, imageMedium: reader.result }))
                  reader.readAsDataURL(file)
                }}
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Poster (original)
              <input
                className="form-input"
                type="url"
                name="imageOriginal"
                value={form.imageOriginal}
                onChange={handleChange}
                placeholder="Paste image URL..."
              />
            </label>
            <span className="form-or">or</span>
            <label className="form-label form-file-label">
              Upload from device
              <input
                className="form-file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => setForm((prev) => ({ ...prev, imageOriginal: reader.result }))
                  reader.readAsDataURL(file)
                }}
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Official Website
              <input
                className="form-input"
                type="url"
                name="officialSite"
                value={form.officialSite}
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-label">
              Summary
              <textarea
                className="form-input form-textarea"
                name="summary"
                rows="3"
                value={form.summary}
                onChange={handleChange}
                placeholder="Brief description of the show..."
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="form-btn form-btn-cancel"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-btn form-btn-save"
              disabled={saving}
            >
              {saving ? 'Saving...' : show ? 'Save Changes' : 'Add Show'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShowForm
