import * as yup from "yup";

export const VideoModel = yup.object().shape({
  name: yup.string().strict().required(),
  description: yup.string().strict().required(),
  duration: yup.string().required(),
});
