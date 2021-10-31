import { toast } from 'react-toastify';

export const createNotification = (msg, type) => {
  switch (type) {
    case 'info':
      toast.info(msg, { theme: 'colored' });
      break;
    case 'success':
      toast.success(msg, { theme: 'colored' });
      break;
    case 'warning':
      toast.warning(msg, { theme: 'colored' });
      break;
    case 'error':
      toast.error(msg, { theme: 'colored' });
      break;

    default:
      console.log('something wrog!');
  }
};
