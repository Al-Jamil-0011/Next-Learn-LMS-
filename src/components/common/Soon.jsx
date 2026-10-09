import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';

/** Placeholder link for pages that are not part of this phase: shows a toast instead of navigating. */
export default function Soon({ children, className, ...rest }) {
  const { toast } = useApp();
  const { x } = useLang();
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        toast(x.soon);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
