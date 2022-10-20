import Swal from 'sweetalert2';

export const toastSuccess = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  position: 'top-right',
  showConfirmButton: false,
  timerProgressBar: true,
  showCloseButton: true,
  timer: 3000,
});

export const toastDanger = Swal.mixin({
  toast: true,
  icon: 'error',
  title: 'General Title',
  position: 'top-right',
  showConfirmButton: false,
  timerProgressBar: true,
  showCloseButton: true,
  timer: 3000,
});

export const confirmButtonLogout = Swal.mixin({
  title: 'Are you sure want to logout?',
  icon: 'warning',
  showCancelButton: true,
  cancelButtonColor: '#00D1FF',
  confirmButtonText: 'Logout!',
});

export default Swal;
