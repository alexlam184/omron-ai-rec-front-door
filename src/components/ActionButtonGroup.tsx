'use client';
import React, { useState } from 'react';
import { User, Paintbrush, Package } from 'lucide-react'; // Import icons
import { useWorkpassBroadcastAdmin } from '@/service/apiService';
import { useGeneralStateStore } from '@/store/GeneralStateStore';

const ButtonStyles: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px', // Space between icon and text
  padding: '16px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px',
  border: '1px solid rgba(200, 200, 200, 0.5)',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.9)',
  color: '#333',
  margin: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  backdropFilter: 'blur(10px)', // Glass effect
};

// Hover effect
const ButtonHoverStyles: React.CSSProperties = {
  background: 'rgba(240, 240, 240, 1)',
  transform: 'scale(1.05)',
};

const ActionButtonGroup: React.FC = () => {
  const { setGeneral_ModalIsOpenedState, setGeneral_ModalContentState } =
    useGeneralStateStore();

  const { mutate: sendBroadcastMessageToAdmin } = useWorkpassBroadcastAdmin({
    onSuccess: (data) => {
      let title = 'Error';
      let message = 'Unexpected error';

      let res: string = data.join(',\n');
      if (!res.includes('Error')) {
        console.log('Success:', data);
        title = 'Success';
        message = 'Broadcast message sent successfully - \n' + res;
      } else {
        //Error
        message += res;
      }

      setGeneral_ModalContentState(title, message);
      setGeneral_ModalIsOpenedState(true);
      setLoading(null); // Reset loading state
    },
    onError: (error) => {
      console.error('Error sending frame:', error);
      setGeneral_ModalContentState(
        'Error',
        `Error sending broadcast Message: ${error}`
      );
      setGeneral_ModalIsOpenedState(true);
      setLoading(null); // Reset loading state
    },
  });

  // Track loading state per button
  const [loading, setLoading] = useState<string | null>(null);

  // Function to handle button clicks
  const handleBroadcast = (visitorType: string) => {
    setLoading(visitorType); // Set loading state for this button

    const broadcastData = {
      title: `${visitorType} Arrival`, // Custom title based on visitor type
      content: `A ${visitorType.toLowerCase()} is arriving at the premises.`,
      time: new Date().toISOString(), // Current timestamp
      venue: 'Main Entrance', // You can update this dynamically if needed
      special: `Notify security about the ${visitorType.toLowerCase()}.`,
    };

    sendBroadcastMessageToAdmin(broadcastData);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        background: 'transparent',
        padding: '10px',
      }}
    >
      {/* Visitor Button */}
      <button
        style={{
          ...ButtonStyles,
          opacity: loading === 'Visitor' ? 0.7 : 1, // Indicate disabled state
        }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, ButtonHoverStyles)
        }
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, ButtonStyles)}
        onClick={() => handleBroadcast('Visitor')}
        disabled={loading !== null} // Disable all buttons while processing
      >
        {loading === 'Visitor' ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <User size={20} />
        )}
        {loading === 'Visitor' ? 'Processing 處理中...' : 'Visitor 訪客'}
      </button>

      {/* Cleaner Button */}
      <button
        style={{
          ...ButtonStyles,
          opacity: loading === 'Cleaner' ? 0.7 : 1,
        }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, ButtonHoverStyles)
        }
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, ButtonStyles)}
        onClick={() => handleBroadcast('Cleaner')}
        disabled={loading !== null}
      >
        {loading === 'Cleaner' ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <Paintbrush size={20} />
        )}
        {loading === 'Cleaner' ? 'Processing 處理中...' : 'Cleaner 清潔'}
      </button>

      {/* Delivery Button */}
      <button
        style={{
          ...ButtonStyles,
          opacity: loading === 'Delivery' ? 0.7 : 1,
        }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, ButtonHoverStyles)
        }
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, ButtonStyles)}
        onClick={() => handleBroadcast('Delivery')}
        disabled={loading !== null}
      >
        {loading === 'Delivery' ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <Package size={20} />
        )}
        {loading === 'Delivery' ? 'Processing 處理中...' : 'Delivery 送貨'}
      </button>
    </div>
  );
};

export default ActionButtonGroup;
