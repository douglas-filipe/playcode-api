import * as yup from "yup";

export const createUserModel = yup.object().shape({
  name: yup.string().strict().required(),
  email: yup.string().email().strict().required(),
  password: yup.string().strict().required(),
});


export const loginUserModel = yup.object().shape({
  email: yup.string().email().strict().required(),
  password: yup.string().strict().required(),
})