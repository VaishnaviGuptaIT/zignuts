/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'violet-950': 'var(--color-violet-950)',
        'indigo-900': 'var(--color-indigo-900)',
        'slate-900': 'var(--color-slate-900)',
        'violet-500': 'var(--color-violet-500)',
        'indigo-500': 'var(--color-indigo-500)',
        'blue-500': 'var(--color-blue-500)',
        'teal-500': 'var(--color-teal-500)',

        'white-opacity-10': 'var(--color-white-opacity-10)',
        'white-opacity-3': 'var(--color-white-opacity-3)',
        'purple-500-opacity-30': 'var(--color-purple-500-opacity-30)',
        'blue-500-opacity-30': 'var(--color-blue-500-opacity-30)',
        'teal-500-opacity-20': 'var(--color-teal-500-opacity-20)',

        'gradient-primary': 'var(--gradient-violet-indigo-slate)',
        'gradient-secondary': 'var(--gradient-violet-indigo)',
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'slideIn': 'slideIn 0.2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'var(--gradient-violet-indigo-slate)',
        'gradient-secondary': 'var(--gradient-violet-indigo)',
      },
      boxShadow: {
        'glow': '0 0 20px var(--color-violet-500)',
        'glow-lg': '0 0 30px var(--color-indigo-500)',
        'inner-glow': 'inset 0 0 20px var(--color-teal-500)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover'],
      textColor: ['group-hover'],
      transform: ['hover', 'focus', 'group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this path to your project structure
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: 'var(--primary-color)',
//         'primary-light': 'var(--primary-light)',
//         'primary-dark': 'var(--primary-dark)',
//         secondary: 'var(--secondary-color)',
//         'secondary-light': 'var(--secondary-light)',
//         'secondary-dark': 'var(--secondary-dark)',
//         'background-light': 'var(--background-light)',
//         'background-dark': 'var(--background-dark)',
//         text: 'var(--text-color)',
//         'text-muted': 'var(--text-muted)',
//         border: 'var(--border-color)',
//         success: 'var(--success-color)',
//         warning: 'var(--warning-color)',
//         error: 'var(--error-color)',
//         'hover-overlay': 'var(--hover-overlay)',
//         shadow: 'var(--shadow-color)',
//       },
//       screens: {
//         '2xl': '1920px',
//         xl: '1199px',
//         lg: '991px',
//         md: '767px',
//         sm: '575px',
//       },
//     },
//   },
//   plugins: [],
// }
