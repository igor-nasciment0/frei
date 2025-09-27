import toast from 'react-hot-toast';

export default async function callApi(callback, ...params) {
  try {
    let r = await callback(...params);

    if (r)
      return r;
    else
      return { success: true }

  } catch (error) {
    if (error.response && error.response.data.Message?.[0])
      toast.error(error.response.data.Message[0], { duration: 4000 });
    else
      toast.error(error.message, { duration: 4000 });
  }
}