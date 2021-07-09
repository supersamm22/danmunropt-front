import Router from './routes';
import ThemeConfig from './theme';
import ScrollToTop from './components/ScrollToTop';
import '../src/style/custom.css'
import '../src/style/app.css'
import '../src/style/login.css';

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
