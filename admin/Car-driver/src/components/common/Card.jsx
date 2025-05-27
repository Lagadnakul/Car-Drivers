import React from 'react';

const Card = ({ title, children, footer, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>}
    </div>
  );
};

export default Card;