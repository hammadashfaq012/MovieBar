export function handleImageError(event) {
  const img = event.currentTarget
  img.onerror = null

  const placeholder = document.createElement('div')
  placeholder.className = img.dataset.placeholderClass || ''
  placeholder.textContent = img.dataset.placeholderText || 'No Image'
  img.replaceWith(placeholder)
}
