import React from 'react';

// Inspired in part by this post by Prawira G:
// https://prawira.medium.com/react-conditional-import-conditional-css-import-110cc58e0da6

const THEMES = {
  LIGHT: "light",
  DARK: "dark"
}

const DEFAULT_THEME = THEMES.LIGHT;

const ThemeSelector = ({ theme = DEFAULT_THEME }) => {
  const Theme = React.lazy(() => import(`./${theme}.js`));

  return (
    <>
      <React.Suspense fallback={<></>}>
        <Theme />
      </React.Suspense>
    </>
  )
}

export default ThemeSelector;