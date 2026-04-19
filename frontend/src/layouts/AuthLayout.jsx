import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="w-full min-h-screen bg-black">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
