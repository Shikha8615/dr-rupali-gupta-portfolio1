import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], build: { rollupOptions: { input: { main: 'index.html', pregnancy: 'pregnancy-care.html', gynaecology: 'gynaecology-care.html', garbhsanskar: 'garbhsanskar.html', familyPlanning: 'family-planning.html' } } } })
