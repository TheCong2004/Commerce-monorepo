import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper';
import './index.css';

console.log("Zalo Mini App: Initializing...");

const container = document.getElementById('app');
if (container) {
  console.log("Zalo Mini App: Root container found, rendering...");
  const root = createRoot(container);
  root.render(<AppWrapper />);
} else {
  console.error("Zalo Mini App: Root container #app NOT FOUND!");
}
