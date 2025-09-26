import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router';

export default function ToasterContainer({ props }) {

  if (!props) {
    props = {}
  }

  const location = useLocation()

  useEffect(() => {
    toast.remove();
  }, [location.pathname])
  
  return (
    <Toaster
      position={props.position ? props.position : 'bottom-center'}
      reverseOrder
      containerClassName='cont-toaster'
      toastOptions={{
        duration: 3000,
      }}
      {...props}
    />
  )
}