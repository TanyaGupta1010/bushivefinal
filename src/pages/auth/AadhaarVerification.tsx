import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import AuthCard from '../../components/AuthCard';

const AadhaarVerification: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  const driverData = location.state?.driverData;

  useEffect(() => {
    // Simulate verification process
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setVerificationStatus('success');
          // Generate Driver ID and proceed to set password
          setTimeout(() => {
            const driverId = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit ID
            navigate('/driver/set-password', { 
              state: { 
                driverData: { ...driverData, driverId } 
              } 
            });
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [driverData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
        <AuthCard
          title="Aadhaar Verification"
          subtitle="Please wait while we verify your Aadhaar details"
          icon={<Shield className="w-8 h-8 text-[#304159]" />}
          variant="green"
        >
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#304159] h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Status */}
            <div className="text-center">
              {verificationStatus === 'pending' && (
                <div className="flex flex-col items-center space-y-4">
                  <Clock className="w-12 h-12 text-green-500 animate-pulse" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Verifying your details...
                    </h3>
                    <p className="text-gray-600">
                      This may take a few moments. Please don't close this window.
                    </p>
                  </div>
                </div>
              )}

              {verificationStatus === 'success' && (
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Verification Successful!
                    </h3>
                    <p className="text-gray-600">
                      Your Aadhaar has been verified. Generating your Driver ID...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Driver Info */}
            {driverData && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Verification Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Name:</strong> {driverData.name}</p>
                  <p><strong>Phone:</strong> {driverData.phone}</p>
                  <p><strong>Aadhaar:</strong> {driverData.aadhaar}</p>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Your information is secure and encrypted
              </p>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default AadhaarVerification;