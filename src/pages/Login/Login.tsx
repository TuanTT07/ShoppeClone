import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema, type schemaType } from '../../utils/rules';
import { useMutation } from '@tanstack/react-query';
import { loginAccount } from '../../apis/auth.api';
import { isAxiosUnprocessableEntityError } from '../../utils/utils';
import Input from '../../components/input';

type FormData = Omit<schemaType, 'confirm_password'>;
const loginSchema = schema.omit(['confirm_password']);

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<schemaType, 'confirm_password'>) => {
      return loginAccount(body);
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<Response<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server',
              });
            });
          }
        }
      },
    });
  });

  return (
    <div className="bg-orange">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
        <div className="lg:col-span-2 lg:col-start-4">
          <form className="p-10 rounded bg-white shadow-sm" onSubmit={onSubmit} noValidate>
            <div className="text-2xl">Đăng Nhập</div>
            <div className="mt-8">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                className="mt-8"
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                className="mt-2"
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full  py-4 px-2 uppercase bg-red-500 text-white text-sm text-center hover:bg-red-600"
              >
                Đăng nhập
              </button>
            </div>

            <div className="mt-8 text-center">
              <span className="text-gray-500">Bạn đã có tài khoản?</span>
              <Link to="/register" className="ml-2 text-red-500 hover:text-red-600">
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
