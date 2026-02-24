import { Link } from 'react-router';

export default function Login() {
  return (
    <div className="bg-orange">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
        <div className="lg:col-span-2 lg:col-start-4">
          <form className="p-10 rounded bg-white shadow-sm">
            <div className="text-2xl">Đăng Nhập</div>
            <div className="mt-8">
              <input
                type="email"
                name="email"
                className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                placeholder="Email"
              />
              <div className="mt-1 text-red-600 min-h-[1rem] text-sm"></div>
            </div>
            <div className="mt-4">
              <input
                type="password"
                name="password"
                className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                placeholder="Password"
              />
              <div className="mt-1 text-red-600 min-h-[1rem] text-sm"></div>
            </div>

            <div className="mt-4">
              <button className="w-full  py-4 px-2 uppercase bg-red-500 text-white text-sm text-center hover:bg-red-600">
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
