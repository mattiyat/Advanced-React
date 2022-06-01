import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  html{
    --black: #393939;
    --red: #ff0000;
    --grey: #3a3a3a;
    --lightGrey: #e1e1e1;
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0.0,0,0,0.09);
  }
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <p>Page component. Children below</p>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.node), PropTypes.node),
};
