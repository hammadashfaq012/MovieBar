import { useState, useEffect, useRef } from 'react'
import { uploadImage } from '../../utils/upload'
import { handleImageError } from '../../utils/image'
import './ShowForm.css'

const MAX_IMAGE_SIZE_MB = 5

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

function isValidHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function ShowForm({ show, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const submittingRef = useRef(false)
  const uploadingRef = useRef(false)

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

  async function handleFileChange(event) {
    const file = event.target.files[0]
    event.target.value = ''

    if (!file) return

    if (uploadingRef.current) return

    if (!file.type || !file.type.startsWith('image/')) {
      setUploadError('Please select an image file.')
      return
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setUploadError(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`)
      return
    }

    setUploadError('')
    setUploading(true)
    uploadingRef.current = true

    try {
      const url = await uploadImage(file)
      setForm((prev) => ({ ...prev, imageMedium: url }))
    } catch (err) {
      setUploadError(err?.message || 'Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      uploadingRef.current = false
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (submittingRef.current) return
    submittingRef.current = true

    if (form.name.trim() === '') {
      setError('Show name is required.')
      submittingRef.current = false
      return
    }

    const urlFields = [
      ['Poster (medium)', form.imageMedium],
      ['Poster (original)', form.imageOriginal],
      ['Official Website', form.officialSite],
    ]

    for (const [label, value] of urlFields) {
      const trimmed = value.trim()
      if (trimmed !== '' && !isValidHttpUrl(trimmed)) {
        setError(
          `${label} must be a valid URL starting with http:// or https://`
        )
        submittingRef.current = false
        return
      }
    }

    setSaving(true)
    setError('')

    try {
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

      await onSubmit(payload)
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
      submittingRef.current = false
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
            <label className="form-label">Poster Image</label>
            <div className="form-upload-controls">
              <label className="form-btn form-btn-cancel form-upload-label">
                {uploading ? 'Uploading...' : 'Upload from Computer'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  hidden
                />
              </label>
              {form.imageMedium && (
                <img
                  className="form-preview"
                  src={form.imageMedium}
                  alt="Poster preview"
                  data-placeholder-class="form-preview-placeholder"
                  data-placeholder-text="No preview"
                  onError={handleImageError}
                />
              )}
              {uploading && (
                <span className="form-upload-status">Uploading image...</span>
              )}
            </div>
            {uploadError && <p className="form-upload-error">{uploadError}</p>}
          </div>

          <div className="form-row form-row-2">
            <label className="form-label">
              Poster (medium)
              <input
                className="form-input"
                type="url"
                name="imageMedium"
                value={form.imageMedium}
                onChange={handleChange}
                placeholder="Paste image URL..."
                disabled={saving}
              />
            </label>
            <label className="form-label">
              Poster (original)
              <input
                className="form-input"
                type="url"
                name="imageOriginal"
                value={form.imageOriginal}
                onChange={handleChange}
                placeholder="Paste image URL..."
                disabled={saving}
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
              disabled={saving || uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-btn form-btn-save"
              disabled={saving || uploading}
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
