import { useForm } from 'react-hook-form';
import { getRules, type FormData } from '../../utils/rules';
import { Link } from 'react-router';
import Input from '../../components/input';

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const rules = getRules(getValues);
  const onSubmit = handleSubmit(
    () => {
      // console.log(data);
    },
    () => {
      // console.log(errors);
    }
  );

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
              rules={rules.email}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="mt-2"
              register={register}
              errorMessage={errors.password?.message}
              rules={rules.password}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-2"
              register={register}
              errorMessage={errors.confirmPassword?.message}
              rules={rules.confirmPassword}
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
