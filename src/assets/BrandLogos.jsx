import React from 'react';

// Generates a simple, professional SVG logo for a given brand name
export const BrandLogo = ({ name, style }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Generate a deterministic color based on the brand name
  const getColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };
  
  const bgColor = '#f9fafb';
  const textColor = getColor(name);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={style}>
      <rect width="100" height="100" fill={bgColor} />
      <text 
        x="50" 
        y="55" 
        fontFamily="Arial, sans-serif" 
        fontSize="36" 
        fontWeight="bold" 
        fill={textColor} 
        textAnchor="middle" 
        alignmentBaseline="middle"
      >
        {getInitials(name)}
      </text>
    </svg>
  );
};
