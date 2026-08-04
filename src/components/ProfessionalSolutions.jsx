import React from 'react';
import { ChevronRight, Zap, Hammer, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolImageAPI from '../utils/ToolImageAPI';

const solutions = [
  {
    id: 1,
    title: 'Forestry Solutions',
    category: 'garden-tools',
    desc: 'Professional chainsaws and brush cutters for extreme forestry operations.',
    icon: Hammer,
    color: '#22c55e',
    image: "https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: 'Construction Elite',
    category: 'power-tools',
    desc: 'High-torque drills, demolition hammers and concrete cutters.',
    icon: Zap,
    color: '#dc2626',
    image: 'https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    title: 'Industrial Precision',
    category: 'heavy-tools',
    desc: 'Heavy-duty welding machines and large-scale industrial machinery.',
    icon: ShieldCheck,
    color: '#3b82f6',
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400"
  }
];

const toolApi = new ToolImageAPI();
const technicalTools = [
  { type: 'torque', title: 'Torque Control' },
  { type: 'adjustable', title: 'Precision Adjustment' },
  { type: 'spanner', title: 'Ergonomic Grip' },
  { type: 'pipe', title: 'Heavy Duty Grip' }
];

const ProfessionalSolutions = () => {
  return (
    <section style={{ padding: '64px 0', background: '#fff', borderTop: '1px solid #f3f4f6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#dc2626', display: 'block', marginBottom: '8px' }}>
              Industrial Excellence
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Trusted by Industry Leaders <br /><span style={{ color: '#dc2626' }}>Industrial Power Solutions</span>
            </h2>
            <p style={{ marginTop: '16px', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', maxWidth: '500px', lineHeight: 1.6 }}>
              Authorized supplier for top international brands. Explore our premium range of professional tools and maintenance parts.
            </p>
          </div>
          <Link to="/categories" style={{ alignSelf: 'flex-start', background: '#dc2626', color: '#fff', padding: '14px 28px', borderRadius: '8px', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.2)' }}>
            EXPLORE ALL ARMAMENTS <ChevronRight size={16} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {solutions.map((sol) => (
            <div key={sol.id} style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <img src={sol.image} alt={sol.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}></div>
              
              <div style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <div style={{ width: '48px', height: '48px', background: sol.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <sol.icon size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '8px' }}>{sol.title}</h3>
                <p style={{ fontSize: '11px', color: '#d1d5db', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.5, marginBottom: '20px' }}>{sol.desc}</p>
                <Link to={`/categories/${sol.category}`} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                  VIEW RANGE
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Benchmarks */}
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '48px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#111' }}>Technical Benchmarks</h3>
            <p style={{ fontSize: '9px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '4px' }}>Engineering Schematics & Working Diagrams</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {technicalTools.map((tool, idx) => (
              <div key={idx} style={{ background: '#111', borderRadius: '12px', padding: '24px', border: '1px solid #1f2937', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.05 }}>
                  <Cpu size={100} color="#fff" />
                </div>
                <div style={{ height: '120px', marginBottom: '20px' }}>
                   <div dangerouslySetInnerHTML={{ __html: toolApi.generateAnimatedWorkingImage(tool.type) }} style={{ width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{tool.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></div>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Schematic</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSolutions;
