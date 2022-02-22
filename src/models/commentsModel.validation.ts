import * as yup from "yup";

export const createCommentsModel = yup.object().shape({
  description: yup.string().strict().required(),
  video: yup.object().strict().required(),
});

export const updateCommetsModel = yup.object().shape({
  description: yup.string().strict().required(),
});
