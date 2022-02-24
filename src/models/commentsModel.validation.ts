import * as yup from "yup";

export const createCommentsModel = yup.object().shape({
  description: yup.string().strict().required(),
  videoId: yup.string().strict().required(),
});

export const updateCommetsModel = yup.object().shape({
  description: yup.string().strict().required(),
});
