import React from 'react';

export function CyberBackground() {
  return (
    <>
      {/* Background Cyber Grid */}
      <div className="cyber-bg-grid" aria-hidden="true" />

      {/* Floating Ambient Glow Orbs */}
      <div className="ambient-glow ambient-cyan" aria-hidden="true" />
      <div className="ambient-glow ambient-purple" aria-hidden="true" />

      {/* Futuristic Scanline Effect */}
      <div className="scanline-overlay" aria-hidden="true" />
    </>
  );
}

