import * as yup from "yup";

export const createVideoModel = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  duration: yup.string().required(),
});
