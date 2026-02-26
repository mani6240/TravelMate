export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  let borderColor = '#2563eb';
  if (type === 'success') borderColor = '#10b981';
  if (type === 'error') borderColor = '#ef4444';
  if (type === 'warning') borderColor = '#f59e0b';

  toast.style.borderLeftColor = borderColor;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}
