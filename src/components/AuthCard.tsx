import React from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'orange' | 'green';
}

const AuthCard: React.FC<AuthCardProps> = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  variant = 'orange' 
}) => {
  const borderColor = variant === 'green' ? 'border-green-100' : 'border-orange-100';
  const iconBgColor = variant === 'green' ? 'bg-green-100' : 'bg-orange-100';

  return (
    <div className="max-w-md mx-auto">
      <div className={`bg-white rounded-2xl shadow-lg border ${borderColor} p-8`}>
        <div className="text-center mb-8">
          <div className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;