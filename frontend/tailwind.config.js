/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Enlazamos las clases de Tailwind con tus variables CSS
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        container: 'var(--container)',
        card: 'var(--card)',
        create: 'var(--create)',
        search: 'var(--search)',
        input: 'var(--input)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          muted: 'var(--primary-muted)'
        },
        danger: {
          DEFAULT: 'var(--danger)',
          hover: 'var(--danger-hover)'
        },
        muted: {
          foreground: 'var(--muted-foreground)'
        }
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)'
      }
    }
  },
  plugins: []
};
