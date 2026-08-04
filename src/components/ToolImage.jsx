import React from 'react';
import ToolImageAPI from '../utils/ToolImageAPI';

const api = new ToolImageAPI();

const ToolImage = ({ toolName, category, className, style }) => {
  // Use the ToolImageAPI to get a themed SVG based on the tool name and category
  const getImageUrl = () => {
    // Basic mapping logic to match categories to ToolImageAPI categories
    let apiCategory = 'adjustable';
    if (category) {
      const cat = category.toLowerCase();
      if (cat.includes('spanner')) apiCategory = 'spanner';
      else if (cat.includes('chain')) apiCategory = 'chain';
      else if (cat.includes('hook')) apiCategory = 'hook';
      else if (cat.includes('torque')) apiCategory = 'torque';
      else if (cat.includes('filter')) apiCategory = 'filter';
      else if (cat.includes('pipe')) apiCategory = 'pipe';
      else if (cat.includes('strap')) apiCategory = 'strap';
      else if (cat.includes('drill') || cat.includes('impact') || cat.includes('cordless')) apiCategory = 'drill';
      else if (cat.includes('grind') || cat.includes('cutter') || cat.includes('abrasive')) apiCategory = 'grinder';
      else if (cat.includes('saw') || cat.includes('blade')) apiCategory = 'saw';
      else if (cat.includes('storage') || cat.includes('cabinet') || cat.includes('cart') || cat.includes('trolley')) apiCategory = 'cabinet';
      // defaults to adjustable
    }

    try {
      const svgString = api.generateToolImage(apiCategory);
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
    } catch (e) {
      const svgString = api.generateToolImage('adjustable');
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
    }
  };

  return (
    <img 
      src={getImageUrl()} 
      alt={toolName} 
      className={className} 
      style={{ 
        ...style, 
        backgroundColor: '#12161c',
        padding: '1rem',
        objectFit: 'contain'
      }}
      onError={(e) => {
        const svgString = api.generateToolImage('adjustable');
        const fallbackSrc = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
        if (e.target.src !== fallbackSrc) {
          e.target.src = fallbackSrc;
        }
      }}
    />
  );
};

export default ToolImage;
