import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode'); // 'signin' or 'signup'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-md">
        {mode === 'signup' ? (
          <SignUp routing="hash" />
        ) : (
          <SignIn routing="hash" />
        )}
      </div>
    </div>
  );
};

export default Login;

