import * as yup from 'yup';
import { type RegisterOptions, type UseFormGetValues } from 'react-hook-form';

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Rules = { [key in keyof FormData]?: RegisterOptions<FormData> };

export const getRules = (getValues?: UseFormGetValues<FormData>): Rules => ({
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Email không hợp lệ' },
    maxLength: { value: 160, message: 'Email không được vượt quá 160 ký tự' },
    minLength: { value: 5, message: 'Email phải có ít nhất 5 ký tự' },
  },
  password: {
    required: { value: true, message: 'Password là bắt buộc' },
    maxLength: { value: 160, message: 'Password không được vượt quá 160 ký tự' },
    minLength: { value: 6, message: 'Password phải có ít nhất 6 ký tự' },
  },
  confirmPassword: {
    required: { value: true, message: 'Confirm Password là bắt buộc' },
    maxLength: { value: 160, message: 'Confirm Password không được vượt quá 160 ký tự' },
    minLength: { value: 6, message: 'Confirm Password phải có ít nhất 6 ký tự' },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm Password không khớp'
        : undefined,
  },
});

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không hợp lệ')
    .max(160, 'Email không được vượt quá 160 ký tự')
    .min(5, 'Email phải có ít nhất 5 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .max(160, 'Password không được vượt quá 160 ký tự')
    .min(6, 'Password phải có ít nhất 6 ký tự'),
  confirm_password: yup
    .string()
    .required('Confirm Password là bắt buộc')
    .max(160, 'Confirm Password không được vượt quá 160 ký tự')
    .min(6, 'Confirm Password phải có ít nhất 6 ký tự')
    .oneOf([yup.ref('password')], 'Confirm Password không khớp'),
});

export type schemaType = yup.InferType<typeof schema>;
