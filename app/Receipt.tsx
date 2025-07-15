import React from 'react';

interface ReceiptProps {
  amount: number;
  message: string;
}

const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ amount, message }, ref) => {
  return (
    <div ref={ref} style={{
      backgroundColor: '#4F46E5',
      color: 'white',
      padding: '20px',
      fontFamily: `
        'Noto Sans Bengali', 
        'SolaimanLipi', 
        'Siyam Rupali', 
        -apple-system, 
        BlinkMacSystemFont, 
        'Segoe UI', 
        Roboto, 
        'Helvetica Neue', 
        Arial, 
        sans-serif
      `,
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Chanda Amount: {amount} Taka</h2>
      <p style={{ color: '#E5E7EB', marginBottom: '20px' }}>{message}</p>
      <p style={{ fontSize: '12px', color: '#E5E7EB', marginTop: '20px', textAlign: 'center' }}>
        Prepared by <a href="https://abusayed.com.bd/projects/chanda-calculator" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Chanda Calculator</a>
        <br />
        <sup>*</sup>This project is maintained by <a href="https://linkedin.com/in/imabusayed" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Abu Sayed</a>.
      </p>
    </div>
  );
});

Receipt.displayName = 'Receipt';

export default Receipt;
