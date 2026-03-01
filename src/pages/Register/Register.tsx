import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Input from '../../components/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, type schemaType } from '../../utils/rules';
import { useMutation } from '@tanstack/react-query';
import { resgisterAccount } from '../../apis/auth.api';
import { omit } from 'lodash';
import { isAxiosUnprocessableEntityError } from '../../utils/utils';
import type { Response } from '../../types/utils.type';
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: yupResolver(schema),
  });

  const resgisterAccountMutation = useMutation({
    mutationFn: (body: Omit<schemaType, 'confirm_password'>) => {
      return resgisterAccount(body);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    resgisterAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<Response<Omit<schemaType, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            setError('email', {
              message: formError?.email,
              type: 'Server',
            });
          }
          if (formError?.password) {
            setError('password', {
              message: formError?.password,
              type: 'Server',
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
            <div className="text-2xl">Đăng Ký</div>
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
            <Input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="mt-2"
              register={register}
              errorMessage={errors.confirm_password?.message}
            />

            <div className="mt-2">
              <button className="w-full  py-4 px-2 uppercase bg-red-500 text-white text-sm text-center hover:bg-red-600">
                Đăng ký
              </button>
            </div>

            <div className="mt-8 text-center">
              <span className="text-gray-500">Bạn đã có tài khoản?</span>
              <Link to="/login" className="ml-2 text-red-500 hover:text-red-600">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
