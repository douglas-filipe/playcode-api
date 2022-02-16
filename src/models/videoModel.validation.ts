import * as yup from "yup";

export const createVideoModel = yup.object().shape({
  name: yup.string().strict().required(),
  description: yup.string().strict().required(),
  thumburl: yup.string().strict().required(),
  videourl: yup.string().strict().required(),
  videokey: yup.string().strict().required(),
  views: yup.number().strict().required(),
  tumbkey: yup.string().strict().required(),
  duration: yup.string().strict().required(),
});
