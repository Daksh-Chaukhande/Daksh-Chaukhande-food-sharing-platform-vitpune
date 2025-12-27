export function Alert({ type = 'info', title, message, onClose }) {
  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div className={`border rounded-lg p-4 mb-4 ${colors[type]} flex items-start justify-between`}>
      <div className="flex items-start gap-3">
        <span className="text-lg font-bold">{icons[type]}</span>
        <div>
          {title && <h3 className="font-semibold">{title}</h3>}
          {message && <p className="text-sm mt-1">{message}</p>}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg hover:opacity-75 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  )
}
